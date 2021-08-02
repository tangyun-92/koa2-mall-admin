/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-02 17:27:19
 * 商品
 */
const Good = require('../models/goods')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const { returnCtxBody } = require('../utils/index')
const Product = require('../models/products')

class GoodCtl {
  // 获取商品列表
  async find(ctx) {
    let {
      page = 1,
      pageSize = 5,
      title = '',
    } = ctx.request.body
    page = Math.max(page, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await Good.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: ['id'],
      where: {
        title: {
          [Op.like]: `${title}%`,
        },
      },
      attributes: {
        include: [
          [sequelize.col('p.title'), 'product_name']
        ]
      },
      include: [
        {
          model: Product,
          as: 'p',
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

  // 创建/更新商品
  async update(ctx) {
    const { id } = ctx.request.body
    if (id) {
      ctx.verifyParams({
        spu_id: { type: 'number', require: false },
        title: { type: 'string', require: false },
        price: { type: 'number', require: false },
        // param: { type: 'string', require: false },
        saleable: { type: 'number', require: false },
        valid: { type: 'number', require: false },
      })
      const repeatedId = await Good.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '商品不存在')
      }
      await Good.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        spu_id: { type: 'number', require: true },
        title: { type: 'string', require: true },
        price: { type: 'number', require: true },
        // param: { type: 'string', require: true },
        saleable: { type: 'number', require: true },
        valid: { type: 'number', require: true },
      })
      await Good.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除商品
  async delete(ctx) {
    const { id } = ctx.request.body
    await Good.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new GoodCtl()
