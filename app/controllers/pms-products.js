/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-29 16:48:29
 * 商品
 */
const Product = require('../models/pms-products')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const { returnCtxBody, fileUpload, formData } = require('../utils/index')
const ProductCategory = require('../models/pms-product-categorys')
const Brand = require('../models/pms-brands')
const PmsProductAttributeValue = require('../models/pms-product-attribute-value')
const PmsSkuStock = require('../models/pms-sku-stock')
const SubjectProductRelation = require('../models/cms-subjects-product-relation')
const PreferenceAreaProductRelation = require('../models/cms-preference-area-product-relation')
const PmsProductLadder = require('../models/pms_product_ladder')
const PmsProductFullReduction = require('../models/pms_product_full_reduction')
const PmsProductVerifyRecord = require('../models/pms_product_verify_record')
const PmsProductOperateLog = require('../models/pms_product_operate_log')

class ProductCtl {
  // 获取商品列表
  async find(ctx) {
    let {
      page = 1,
      pageSize = 5,
      name = '',
      brand_id = '',
      product_category_id = '',
      product_sn = '',
      publish_status = '',
    } = ctx.request.body
    page = Math.max(page, 1)
    pageSize = Math.max(pageSize, 1)
    if (product_category_id === null) {
      product_category_id = ''
    }
    const { count, rows } = await Product.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['id', 'DESC']],
      where: {
        name: {
          [Op.like]: `${name}%`,
        },
        brand_id: {
          [Op.like]: brand_id ? `${brand_id}` : `%${brand_id}%`,
        },
        product_category_id: {
          [Op.like]: product_category_id
            ? `${product_category_id}`
            : `%${product_category_id}%`,
        },
        product_sn: {
          [Op.like]: `${product_sn}%`,
        },
        publish_status: {
          [Op.like]: publish_status
            ? `${publish_status}`
            : `%${publish_status}%`,
        },
      },
      attributes: {
        include: [[sequelize.col('pc.name'), 'product_category_name']],
        include: [[sequelize.col('b.name'), 'brand_name']],
      },
      include: [
        {
          model: ProductCategory,
          as: 'pc',
          attributes: [],
        },
        {
          model: Brand,
          as: 'b',
          attributes: [],
        },
      ],
    })
    ctx.body = returnCtxBody({
      data: {
        records: rows,
        page,
        pageSize,
        total: count,
      },
    })
  }

  // 获取商品详情
  async detail(ctx) {
    const { id } = ctx.request.body
    const res = await Product.findByPk(id)
    // 商品属性
    const attr = await PmsProductAttributeValue.findAll({
      where: {
        product_id: id,
      },
    })
    // sku
    const sku = await PmsSkuStock.findAll({
      where: {
        product_id: id,
      },
    })
    // 专题
    const subject = await SubjectProductRelation.findAll({
      where: {
        product_id: id,
      },
    })
    const subjectIds = []
    subject.forEach((item) => {
      subjectIds.push(item.subject_id)
    })
    const preference = await PreferenceAreaProductRelation.findAll({
      where: {
        product_id: id,
      },
    })
    // 优选
    const preferenceIds = []
    preference.forEach((item) => {
      preferenceIds.push(item.preference_id)
    })
    // 阶梯价格
    const ladderTableData = await PmsProductLadder.findAll({
      where: {
        product_id: id,
      },
      order: ['count'],
    })
    // 满减价格
    const fullReduceTableData = await PmsProductFullReduction.findAll({
      where: {
        product_id: id,
      },
    })
    res.dataValues.productAttributeValueList = attr
    res.dataValues.skuTableData = sku
    res.dataValues.subjectIds = subjectIds
    res.dataValues.preferenceIds = preferenceIds
    res.dataValues.ladderTableData = ladderTableData
    res.dataValues.fullReduceTableData = fullReduceTableData
    ctx.body = returnCtxBody({
      data: {
        records: res,
      },
    })
  }

  // 商品图片上传
  async upload(ctx) {
    const url = fileUpload(ctx, 'products', true)
    ctx.body = {
      status: 200,
      result: true,
      message: '上传成功',
      url: url[0].url,
    }
  }

  // 创建/更新商品
  async update(ctx) {
    const {
      id,
      product_category_id,
      productAttributeValueList,
      skuTableData,
      subjectIds,
      preferenceIds,
      ladderTableData,
      fullReduceTableData,
    } = ctx.request.body
    if (id) {
      const repeatedId = await Product.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '商品不存在')
      }
      await Product.update(ctx.request.body, { where: { id } })
      const newProductInfo = await Product.findByPk(id)
      // 生成一条操作记录
      if (repeatedId.price !== newProductInfo.price || repeatedId.promotion_price !== newProductInfo.promotion_price || repeatedId.gift_point !== newProductInfo.gift_point || repeatedId.use_point_limit !== newProductInfo.use_point_limit) {
        const time = Date.now()
        await PmsProductOperateLog.create({
          product_id: repeatedId.id,
          price_old: repeatedId.price,
          price_new: newProductInfo.price,
          sale_price_old: repeatedId.promotion_price,
          sale_price_new: newProductInfo.promotion_price,
          gift_point_old: repeatedId.gift_point,
          gift_point_new: newProductInfo.gift_point,
          use_point_limit_old: repeatedId.use_point_limit,
          use_point_limit_new: newProductInfo.use_point_limit,
          operate_man: ctx.state.user.username,
          create_time: formData(time),
        })
      }
      // 商品 sku 库存
      skuTableData.forEach(async (item) => {
        // 如果id存在，执行更新操作
        if (item.id) {
          await PmsSkuStock.update(
            {
              id: item.id,
              product_id: repeatedId.id,
              stock: item.stock,
              low_stock: item.low_stock,
              price: item.price,
              sku_code: item.sku_code,
              sp_data: item.sp_data,
              pic: item.pic,
            },
            {
              where: {
                id: item.id,
              },
            }
          )
        } else {
          // 如果id不存在执行新增操作，并且新增之前先删除之前的sku信息
          await PmsSkuStock.destroy({
            where: {
              product_id: repeatedId.id,
            },
          })
          await PmsSkuStock.create({
            product_id: repeatedId.id,
            stock: item.stock ? item.stock : null,
            low_stock: item.low_stock ? item.low_stock : null,
            price: item.price ? item.price : null,
            sku_code: item.sku_code ? item.sku_code : null,
            sp_data: item.sp_data ? item.sp_data : null,
            pic: item.pic ? item.pic : '',
          })
        }
      })
      // 商品属性值列表
      productAttributeValueList.forEach(async (item) => {
        await PmsProductAttributeValue.update(item, {
          where: { id: item.id },
        })
      })
      // 商品关联的专题
      subjectIds.forEach(async (item) => {
        await SubjectProductRelation.destroy({
          where: {
            product_id: repeatedId.id,
          },
        })
        await SubjectProductRelation.create({
          product_id: repeatedId.id,
          subject_id: item,
        })
      })
      // 商品关联的优选
      preferenceIds.forEach(async (item) => {
        await PreferenceAreaProductRelation.destroy({
          where: {
            product_id: repeatedId.id,
          },
        })
        await PreferenceAreaProductRelation.create({
          product_id: repeatedId.id,
          preference_id: item,
        })
      })
      // 商品阶梯价格
      ladderTableData.forEach(async (item) => {
        if (Number(item.count) !== 0) {
          await PmsProductLadder.destroy({
            where: {
              product_id: repeatedId.id,
            },
          })
          await PmsProductLadder.create({
            product_id: repeatedId.id,
            count: item.count,
            discount: item.discount,
            price: item.price,
          })
        }
      })
      // 商品满减价格
      fullReduceTableData.forEach(async (item) => {
        if (Number(item.full_price) !== 0) {
          await PmsProductFullReduction.destroy({
            where: {
              product_id: repeatedId.id,
            },
          })
          await PmsProductFullReduction.create({
            product_id: repeatedId.id,
            full_price: item.full_price,
            reduce_price: item.reduce_price,
          })
        }
      })
    } else {
      const res = await Product.create(ctx.request.body)
      // 商品 sku 库存
      skuTableData.forEach(async (item) => {
        await PmsSkuStock.create({
          product_id: res.id,
          stock: item.stock ? item.stock : null,
          low_stock: item.low_stock ? item.low_stock : null,
          price: item.price ? item.price : null,
          sku_code: item.sku_code ? item.sku_code : null,
          sp_data: item.sp_data ? item.sp_data : null,
          pic: item.pic ? item.pic : '',
        })
      })
      // 商品属性
      productAttributeValueList.forEach(async (item) => {
        await PmsProductAttributeValue.create({
          product_id: res.id,
          product_attribute_id: item.product_attribute_id,
          value: item.value,
        })
      })
      // 商品关联的主题
      subjectIds.forEach(async (item) => {
        await SubjectProductRelation.create({
          product_id: res.id,
          subject_id: item,
        })
      })
      // 商品关联的优选
      preferenceIds.forEach(async (item) => {
        await PreferenceAreaProductRelation.create({
          product_id: res.id,
          preference_id: item,
        })
      })
      // 商品阶梯价格
      ladderTableData.forEach(async (item) => {
        if (Number(item.count) !== 0) {
          await PmsProductLadder.create({
            product_id: res.id,
            count: item.count,
            discount: item.discount,
            price: item.price,
          })
        }
      })
      // 商品满减价格
      fullReduceTableData.forEach(async (item) => {
        if (Number(item.full_price) !== 0) {
          await PmsProductFullReduction.create({
            product_id: res.id,
            full_price: item.full_price,
            reduce_price: item.reduce_price,
          })
        }
      })
    }
    ctx.body = returnCtxBody({})
  }

  // 删除商品
  async delete(ctx) {
    const { id } = ctx.request.body
    await PmsSkuStock.destroy({
      where: {
        product_id: id,
      },
    })
    await PmsProductAttributeValue.destroy({
      where: {
        product_id: id,
      },
    })
    await SubjectProductRelation.destroy({
      where: {
        product_id: id,
      },
    })
    await PreferenceAreaProductRelation.destroy({
      where: {
        product_id: id,
      },
    })
    await Product.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }

  // 审核商品
  async verify(ctx) {
    const { product_id, status } = ctx.request.body
    const time = Date.now()
    console.log(ctx.state, 'ctx.state')
    await Product.update(
      {
        verify_status: status,
      },
      {
        where: {
          id: product_id,
        },
      }
    )
    await PmsProductVerifyRecord.create({
      ...ctx.request.body,
      product_id,
      create_time: formData(time),
      verify_man: ctx.state.user.username,
    })
    ctx.body = returnCtxBody({})
  }

  // 审核记录
  async verifyRecord(ctx) {
    const { id } = ctx.request.body
    const res = await PmsProductVerifyRecord.findAll({
      where: {
        product_id: id,
      },
      order: [['create_time', 'DESC']],
    })
    ctx.body = returnCtxBody({
      data: {
        records: res,
      },
    })
  }

  // 操作记录
  async operateLog(ctx) {
    const { id } = ctx.request.body
    const res = await PmsProductOperateLog.findAll({
      where: {
        product_id: id,
      },
      order: [['create_time', 'DESC']],
    })
    ctx.body = returnCtxBody({
      data: {
        records: res,
      },
    })
  }
}

module.exports = new ProductCtl()
