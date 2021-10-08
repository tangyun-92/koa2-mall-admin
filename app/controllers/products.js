/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-08 16:08:19
 * 产品
 */
const Product = require('../models/products')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const { returnCtxBody } = require('../utils/index')
const Category = require('../models/categorys')
const SpecGroup = require('../models/spec-group')

class ProductCtl {
  // 获取产品列表
  async find(ctx) {
    let {
      page = 1,
      pageSize = 5,
      title = '',
      saleable = '',
      valid = '',
    } = ctx.request.body
    page = Math.max(page, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await Product.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: ['id'],
      where: {
        title: {
          [Op.like]: `${title}%`,
        },
        saleable: {
          [Op.like]: `${saleable}%`,
        },
        valid: {
          [Op.like]: `${valid}%`,
        },
      },
      attributes: {
        include: [
          [sequelize.col('c.name'), 'category_name'],
          [sequelize.col('s.name'), 'spec_group_name'],
        ]
      },
      include: [
        {
          model: Category,
          as: 'c',
          attributes: []
        },
        {
          model: SpecGroup,
          as: 's',
          attributes: []
        }
      ]
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

  // 创建/更新产品
  async update(ctx) {
    const { id } = ctx.request.body
    if (id) {
      ctx.verifyParams({
        title: { type: 'string', require: false },
        category_id: { type: 'number', require: false },
        brand_id: { type: 'number', require: false },
        spg_id: { type: 'number', require: false },
        saleable: { type: 'number', require: false },
        valid: { type: 'number', require: false },
      })
      const repeatedId = await Product.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '产品不存在')
      }
      await Product.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        title: { type: 'string', require: true },
        category_id: { type: 'number', require: true },
        brand_id: { type: 'number', require: false },
        spg_id: { type: 'number', require: true },
        saleable: { type: 'number', require: true },
        valid: { type: 'number', require: true },
      })
      await Product.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除产品
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
