/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-15 16:45:05
 * 商品
 */
const Product = require('../models/pms-products')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const { returnCtxBody, fileUpload } = require('../utils/index')
const ProductCategory = require('../models/pms-product-categorys')
const Brand = require('../models/pms-brands')
const PmsProductAttributeValue = require('../models/pms-product-attribute-value')
const PmsSkuStock = require('../models/pms-sku-stock')

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
    const attr = await PmsProductAttributeValue.findAll({
      where: {
        product_id: id,
      },
    })
    const sku = await PmsSkuStock.findAll({
      where: {
        product_id: id
      }
    })
    res.dataValues.productAttributeValueList = attr
    res.dataValues.skuTableData = sku
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
      url,
    }
  }

  // 创建/更新商品
  async update(ctx) {
    const { id, product_category_id, productAttributeValueList, skuTableData } =
      ctx.request.body
    if (id) {
      const repeatedId = await Product.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '商品不存在')
      }
      await Product.update(ctx.request.body, { where: { id } })
      // 商品 sku 库存
      skuTableData.forEach(async item => {
        await PmsSkuStock.create({
          product_id: repeatedId.id,
          stock: item.stock,
          low_stock: item.low_stock,
          price: item.price,
          sku_code: item.sku_code,
          sp_data: item.sp_data,
        })
      })
      // 商品属性值列表
      // productAttributeValueList.forEach(async (item) => {
      //   await PmsProductAttributeValue.update(
      //     item,
      //     {
      //       where: { id: item.id },
      //     }
      //   )
      // })
    } else {
      const res = await Product.create(ctx.request.body)
      console.log(res.id, '我是一个res的id')
      productAttributeValueList.forEach(async (item) => {
        await PmsProductAttributeValue.create({
          product_id: repeatedId.id,
          product_attribute_id: item.product_attribute_id,
          value: item.value,
        })
      })
    }
    ctx.body = returnCtxBody({})
  }

  // 删除商品
  async delete(ctx) {
    const { id } = ctx.request.body
    await Product.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new ProductCtl()
