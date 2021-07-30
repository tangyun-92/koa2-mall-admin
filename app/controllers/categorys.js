/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-30 14:47:23
 * 商品分类
 */
const Category = require('../models/categorys')
const { Op } = require('sequelize')
const { returnCtxBody, createTree } = require('../utils/index')

class CategoryCtl {
  // 获取商品分类列表
  async find(ctx) {
    let { name = '' } = ctx.request.body
    const { count, rows } = await Category.findAndCountAll({
      order: ['id'],
      where: {
        is_deleted: 0,
        name: {
          [Op.like]: `${name}%`,
        },
      },
    })
    const data = createTree(rows, 0)
    ctx.body = returnCtxBody({
      data: {
        records: data,
        total: count,
      },
    })
  }

  // 创建/更新商品分类
  async update(ctx) {
    const { id } = ctx.request.body
    if (id) {
      ctx.verifyParams({
        name: { type: 'string', require: false },
        if_parent: { type: 'number', require: false },
        sort: { type: 'number', require: false },
      })
      const repeatedId = await Category.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '商品分类不存在')
      }
      await Category.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        name: { type: 'string', require: true },
        if_parent: { type: 'number', require: true },
        sort: { type: 'number', require: true },
      })
      await Category.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除商品分类
  async delete(ctx) {
    const { id } = ctx.request.body
    await Category.update({ is_deleted: 1 }, {
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new CategoryCtl()
