/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-27 17:19:59
 * 角色
 */
const Role = require('../models/roles')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const { returnCtxBody } = require('../utils/index')

class RoleCtl {
  // 获取角色列表
  async find(ctx) {
    let { page = 1, pageSize = 5, role = '' } = ctx.request.body
    page = Math.max(page, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await Role.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: ['id'],
      where: {
        role: {
          [Op.or]: {
            [Op.like]: `%${role}%`,
            [Op.eq]: role ? role : false,
          },
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

  // 新增角色
  async create(ctx) {
    ctx.verifyParams({
      role: { type: 'string', require: true },
    })
    const { role } = ctx.request.body
    const repeatedRole = await Role.findOne({ where: { role } })
    if (repeatedRole) {
      ctx.throw(409, '角色已存在')
    }
    await Role.create(ctx.request.body)
    ctx.body = returnCtxBody({})
  }

  // 更新角色
  async update(ctx) {
    ctx.verifyParams({
      role: { type: 'string', require: false },
    })
    const { id, role } = ctx.request.body
    const repeatedId = await Role.findByPk(id)
    const repeatedRole = await Role.findOne({ where: { role } })
    if (!repeatedId) {
      ctx.throw(404, '角色不存在')
    }
    if (repeatedRole.dataValues.id !== id) {
      ctx.throw(409, '角色名已存在')
    }
    await Role.update(ctx.request.body, { where: { id } })
    ctx.body = returnCtxBody({})
  }

  // 删除角色
  async delete(ctx) {
    const { id } = ctx.request.body
    const repeatedRole = await Role.findByPk(id)
    if (!repeatedRole) {
      ctx.throw(404, '角色不存在')
    }
    await Role.destroy({ where: { id } })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new RoleCtl()
