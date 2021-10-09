/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-09 13:53:32
 * 商品分类
 */
const PmsProductCategory = require('../models/pms-product-categorys')
const { Op } = require('sequelize')
const { returnCtxBody, createTree } = require('../utils/index')

class PmsProductCategoryCtl {
  // 获取商品分类列表
  async find(ctx) {
    let { name = '' } = ctx.request.body
    const { count, rows } = await PmsProductCategory.findAndCountAll({
      order: [['id', 'DESC']],
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    })
    // const obj = {
    //   id: 0,
    //   parent_id: 0,
    //   name: '无上级分类'
    // }
    const data = createTree(rows, 0)
    // data.unshift(obj)
    ctx.body = returnCtxBody({
      data: {
        records: data,
        total: count,
      },
    })
  }

  // 创建/更新商品分类
  async update(ctx) {
    const { id, parent_id } = ctx.request.body
    if (id) {
      ctx.verifyParams({
        name: { type: 'string', require: false },
      })
      const repeatedId = await PmsProductCategory.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '商品分类不存在')
      }
      await PmsProductCategory.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        name: { type: 'string', require: true },
      })
      const level = parent_id ? 2 : 1
      await PmsProductCategory.create({
        ...ctx.request.body,
        level,
        parent_id: parent_id ? parent_id : 0,
      })
    }
    ctx.body = returnCtxBody({})
  }

  // 删除商品分类
  async delete(ctx) {
    const { id } = ctx.request.body
    await PmsProductCategory.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    await PmsProductCategory.destroy({
      where: {
        parent_id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new PmsProductCategoryCtl()
