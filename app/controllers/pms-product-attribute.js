/*
 * @Author: 唐云
 * @Date: 2021-10-09 15:16:03
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-12 14:12:12
 * 商品属性
 */

const PmsProductAttribute = require('../models/pms-product-attribute')
const PmsProductAttributeCategory = require('../models/pms-product-attribute-categorys')
const { Op } = require('sequelize')
const { returnCtxBody } = require('../utils/index')

class PmsProductAttributeCtl {
  // 获取商品属性列表
  async find(ctx) {
    const { attributeCategoryId, type = '' } = ctx.request.body
    const { count, rows } = await PmsProductAttribute.findAndCountAll({
      order: ['sort'],
      where: {
        product_attribute_category_id: {
          [Op.like]: `${attributeCategoryId}`,
        },
        type: {
          [Op.like]: type ? `${type}` : `%${type}%`,
        },
      },
    })
    ctx.body = returnCtxBody({
      data: {
        records: rows,
        total: count,
      },
    })
  }

  // 创建/更新商品属性
  async update(ctx) {
    const { id, product_attribute_category_id, type } = ctx.request.body
    if (id) {
      ctx.verifyParams({
        name: { type: 'string', require: false },
      })
      const repeatedId = await PmsProductAttribute.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '商品属性不存在')
      }
      await PmsProductAttribute.update(ctx.request.body, {
        where: { id },
      })
    } else {
      // 找到商品属性对应的商品类型，删除的同时将attribute_count加1
      const category = await PmsProductAttributeCategory.findByPk(
        product_attribute_category_id
      )
      let updateParam = null
      if (type === 1) {
        updateParam = { attribute_count: category.attribute_count + 1 }
      } else if (type === 2) {
        updateParam = { param_count: category.param_count + 1 }
      }
      await PmsProductAttributeCategory.update(updateParam, {
        where: { id: product_attribute_category_id },
      })
      // 新增
      ctx.verifyParams({
        name: { type: 'string', require: true },
      })
      await PmsProductAttribute.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除商品属性
  async delete(ctx) {
    const { id, product_attribute_category_id, type } = ctx.request.body
    // 找到商品属性对应的商品类型，删除的同时将attribute_count减1
    const category = await PmsProductAttributeCategory.findByPk(
      product_attribute_category_id
    )
    let updateParam = null
    if (type === 1) {
      updateParam = { attribute_count: category.attribute_count - id.length }
    } else if (type === 2) {
      updateParam = { param_count: category.param_count - id.length }
    }
    await PmsProductAttributeCategory.update(
      updateParam,
      {
        where: { id: product_attribute_category_id },
      }
    )
    await PmsProductAttribute.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new PmsProductAttributeCtl()
