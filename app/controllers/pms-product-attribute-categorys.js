/*
 * @Author: 唐云
 * @Date: 2021-10-09 15:16:03
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-11 10:44:28
 * 商品类型
 */

const PmsProductAttributeCategory = require('../models/pms-product-attribute-categorys')
const { Op } = require('sequelize')
const { returnCtxBody } = require('../utils/index')

class PmsProductAttributeCategoryCtl {
  // 获取商品类型列表
  async find(ctx) {
    let { currentPage = 1, pageSize = 5, name = '' } = ctx.request.body
    currentPage = Math.max(currentPage, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await PmsProductAttributeCategory.findAndCountAll({
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      order: [['id', 'DESC']],
      where: {
        name: {
          [Op.like]: `${name}%`,
        },
      },
    })
    ctx.body = returnCtxBody({
      data: {
        records: rows,
        currentPage,
        pageSize,
        total: count,
      },
    })
  }

  // 获取商品类型Map
  async findMap(ctx) {
    const { count, rows } = await PmsProductAttributeCategory.findAndCountAll({
      order: [['id', 'DESC']],
      attributes: [
        'id', 'name'
      ]
    })
    ctx.body = returnCtxBody({
      data: {
        records: rows,
        total: count,
      },
    })
  }

  // 创建/更新商品类型
  async update(ctx) {
    const { id, parent_id } = ctx.request.body
    if (id) {
      ctx.verifyParams({
        name: { type: 'string', require: false },
      })
      const repeatedId = await PmsProductAttributeCategory.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '商品类型不存在')
      }
      await PmsProductAttributeCategory.update(ctx.request.body, {
        where: { id },
      })
    } else {
      ctx.verifyParams({
        name: { type: 'string', require: true },
      })
      const level = parent_id ? 2 : 1
      await PmsProductAttributeCategory.create({
        ...ctx.request.body,
        level,
        parent_id: parent_id ? parent_id : 0,
      })
    }
    ctx.body = returnCtxBody({})
  }

  // 删除商品类型
  async delete(ctx) {
    const { id } = ctx.request.body
    await PmsProductAttributeCategory.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new PmsProductAttributeCategoryCtl()
