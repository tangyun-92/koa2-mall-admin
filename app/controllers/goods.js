/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-03 14:57:28
 * 商品
 */
const Good = require('../models/goods')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const { returnCtxBody, fileUpload } = require('../utils/index')
const Product = require('../models/products')
const SpecParam = require('../models/spec-param')

class GoodCtl {
  // 获取商品列表
  async find(ctx) {
    let { page = 1, pageSize = 5, title = '', spu_id = '' } = ctx.request.body
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
        spu_id: {
          [Op.like]: `${title}%`,
        },
      },
      attributes: {
        include: [[sequelize.col('p.title'), 'product_name']],
      },
      include: [
        {
          model: Product,
          as: 'p',
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

  // 根据商品所属的产品id获取指定商品所拥有的参数列表
  async getGoodParam(ctx) {
    const { spu_id } = ctx.request.body
    const products = await Product.findAll(spu_id)
    const params = await SpecParam.findAll({
      where: { spg_id: products[0].spg_id },
    })
    ctx.body = {
      result: true,
      status: 200,
      data: params,
    }
  }

  // 商品图片上传
  async upload(ctx) {
    const url = fileUpload(ctx, 'goods', true)
    ctx.body = {
      status: 200,
      result: true,
      message: '上传成功',
      url,
    }
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
