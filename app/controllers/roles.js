/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-29 15:49:28
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
          [Op.like]: `${role}%`,
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

  /**
   * 获取所有角色的Map
   * @param {*} ctx
   */
  async findMap(ctx) {
    const roles = await Role.findAll()
    const obj = {}
    roles.forEach((item) => {
      let key = item.id
      obj[key] = item.role
    })
    ctx.body = {
      data: obj,
      status: 200,
      message: '获取成功',
      result: true,
    }
  }

  // 创建/更新角色
  async update(ctx) {
    const { id, role } = ctx.request.body
    const repeatedRole = await Role.findOne({ where: { role } })
    if (repeatedRole && repeatedRole.dataValues.id !== id) {
      ctx.throw(200, '角色名已存在')
    }
    if (id) {
      ctx.verifyParams({
        role: { type: 'string', require: false },
      })
      const repeatedId = await Role.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '角色不存在')
      }
      await Role.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        role: { type: 'string', require: true },
      })
      await Role.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除角色
  async delete(ctx) {
    const { id } = ctx.request.body
    await Role.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new RoleCtl()
