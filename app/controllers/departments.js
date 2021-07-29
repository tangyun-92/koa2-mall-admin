/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-29 10:11:42
 * 角色
 */
const Department = require('../models/departments')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const { returnCtxBody } = require('../utils/index')

class DepartmentCtl {
  // 获取部门列表
  async find(ctx) {
    let { page = 1, pageSize = 5, dname = '' } = ctx.request.body
    page = Math.max(page, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await Department.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: ['id'],
      where: {
        dname: {
          [Op.or]: {
            [Op.like]: `%${dname}%`,
            [Op.eq]: dname ? dname : false,
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

  // 创建/更新部门
  async update(ctx) {
    const { id, dname } = ctx.request.body
    const repeatedDepartment = await Department.findOne({ where: { dname } })
    if (repeatedDepartment && repeatedDepartment.dataValues.id !== id) {
      ctx.throw(200, '部门名称已存在')
    }
    if (id) {
      ctx.verifyParams({
        dname: { type: 'string', require: false },
      })
      const repeatedId = await Department.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '部门不存在')
      }
      await Department.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        dname: { type: 'string', require: true },
      })
      await Department.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除部门
  async delete(ctx) {
    const { id } = ctx.request.body
    await Department.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new DepartmentCtl()
