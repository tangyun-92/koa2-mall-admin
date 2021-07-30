/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-30 15:54:28
 * 品类
 */
const SpecGroup = require('../models/spec-group')
const SpecParam = require('../models/spec-param')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const { returnCtxBody } = require('../utils/index')

class SpecGroupCtl {
  // 获取品类列表
  async find(ctx) {
    let { page = 1, pageSize = 5, name = '' } = ctx.request.body
    page = Math.max(page, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await SpecGroup.findAndCountAll({
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
    const repeatedSpecGroup = await SpecGroup.findOne({ where: { name } })
    if (repeatedSpecGroup && repeatedSpecGroup.dataValues.id !== id) {
      ctx.throw(200, '品类名称已存在')
    }
    if (id) {
      ctx.verifyParams({
        name: { type: 'string', require: false },
      })
      const repeatedId = await SpecGroup.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '品类不存在')
      }
      await SpecGroup.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        name: { type: 'string', require: true },
      })
      await SpecGroup.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除品类
  async delete(ctx) {
    const { id } = ctx.request.body
    await SpecGroup.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }

  // 获取指定参数列表 -- 根据品类编号
  async findParam(ctx) {
    let { spg_id } = ctx.request.body
    const data = await SpecParam.findAll({
      order: ['spp_id'], // 根据参数编号排序
      where: {
        spg_id,
      },
    })
    ctx.body = returnCtxBody({
      data: {
        records: data,
      },
    })
  }

  // 创建/更新品类参数
  async updateParam(ctx) {
    const { id } = ctx.request.body
    if (id) {
      ctx.verifyParams({
        name: { type: 'string', require: false },
        spg_id: { type: 'number', require: false },
        spp_id: { type: 'number', require: false },
        name: { type: 'string', require: false },
        numeric: { type: 'number', require: false },
        generic: { type: 'number', require: false },
        searching: { type: 'number', require: false },
      })
      const repeatedId = await SpecParam.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '参数不存在')
      }
      await SpecParam.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        name: { type: 'string', require: true },
        spg_id: { type: 'number', require: true },
        spp_id: { type: 'number', require: true },
        name: { type: 'string', require: true },
        numeric: { type: 'number', require: true },
        generic: { type: 'number', require: true },
        searching: { type: 'number', require: true },
      })
      await SpecParam.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除品类参数
  async deleteParam(ctx) {
    const { id } = ctx.request.body
    await SpecParam.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new SpecGroupCtl()
