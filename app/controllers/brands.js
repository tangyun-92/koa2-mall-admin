/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-30 13:37:05
 * 品牌
 */
const Brand = require('../models/brands')
const { Op } = require('sequelize')
const { returnCtxBody, fileUpload } = require('../utils/index')

class BrandCtl {
  // 获取品牌列表
  async find(ctx) {
    let { page = 1, pageSize = 5, name = '' } = ctx.request.body
    page = Math.max(page, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await Brand.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: ['id'],
      where: {
        is_deleted: 0,
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

  // 品牌logo上传
  async upload(ctx) {
    const url = fileUpload(ctx, 'brands')
    ctx.body = {
      status: 200,
      result: true,
      message: '上传成功',
      url,
    }
  }

  // 创建/更新品牌
  async update(ctx) {
    const { id, name } = ctx.request.body
    const repeatedBrand = await Brand.findOne({ where: { name } })
    if (repeatedBrand && repeatedBrand.dataValues.id !== id) {
      ctx.throw(200, '品牌名称已存在')
    }
    if (id) {
      ctx.verifyParams({
        name: { type: 'string', require: false },
        letter: { type: 'string', require: false },
      })
      const repeatedId = await Brand.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '品牌不存在')
      }
      await Brand.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        name: { type: 'string', require: true },
        letter: { type: 'string', require: true },
      })
      await Brand.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除品牌
  async delete(ctx) {
    const { id } = ctx.request.body
    await Brand.update({ is_deleted: 1 }, {
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new BrandCtl()
