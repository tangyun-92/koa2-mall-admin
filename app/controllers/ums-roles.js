/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-08 14:58:46
 * 角色
 */
const Role = require('../models/ums-roles')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const { returnCtxBody, formData } = require('../utils/index')

class RoleCtl {
  // 获取角色列表
  async find(ctx) {
    let { currentPage = 1, pageSize = 5, name = '' } = ctx.request.body
    currentPage = Math.max(currentPage, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await Role.findAndCountAll({
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      order: ['id'],
      where: {
        name: {
          [Op.like]: `%${name}%`,
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

  // 创建/更新角色
  async update(ctx) {
    const { id, name } = ctx.request.body
    const repeatedRole = await Role.findOne({ where: { name } })
    if (repeatedRole && repeatedRole.dataValues.id !== id) {
      ctx.throw(200, '角色名已存在')
    }
    if (id) {
      ctx.verifyParams({
        name: { type: 'string', require: false },
      })
      const repeatedId = await Role.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '角色不存在')
      }
      await Role.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        name: { type: 'string', require: true },
      })
      const time = Date.now()
      await Role.create({
        ...ctx.request.body,
        create_time: formData(time),
      })
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

  // 启用/禁用角色
  async changeStatus(ctx) {
    const { id, status } = ctx.request.body
    if (status !== 0 && status !== 1) {
      ctx.throw(200, 'status只能为0或者1')
    }
    await Role.update(
      { status },
      {
        where: {
          id: {
            [Op.or]: id,
          },
        },
      }
    )
    ctx.body = returnCtxBody({})
  }
}

module.exports = new RoleCtl()
