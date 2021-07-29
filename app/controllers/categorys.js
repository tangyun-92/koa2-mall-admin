/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-29 17:06:13
 * 品类
 */
const Category = require('../models/categorys')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const { returnCtxBody } = require('../utils/index')

class CategoryCtl {
  // 获取品类列表
  async find(ctx) {
    let { page = 1, pageSize = 5, name = '' } = ctx.request.body
    page = Math.max(page, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await Category.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: ['id'],
      where: {
        name: {
          [Op.like]: `${name}%`,
        },
      },
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

  // 创建/更新品类
  async update(ctx) {
    const { id, name } = ctx.request.body
    const repeatedCategory = await Category.findOne({ where: { name } })
    if (repeatedCategory && repeatedCategory.dataValues.id !== id) {
      ctx.throw(200, '品类名称已存在')
    }
    if (id) {
      ctx.verifyParams({
        name: { type: 'string', require: false },
      })
      const repeatedId = await Category.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '品类不存在')
      }
      await Category.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        name: { type: 'string', require: true },
      })
      await Category.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除品类
  async delete(ctx) {
    const { id } = ctx.request.body
    await Category.destroy({
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
