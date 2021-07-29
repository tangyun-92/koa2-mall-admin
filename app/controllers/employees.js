/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-29 15:48:03
 * 员工
 */
const Employees = require('../models/employees')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const { returnCtxBody } = require('../utils/index')
const Job = require('../models/jobs')
const Department = require('../models/departments')

class EmployeesCtl {
  // 获取员工列表
  async find(ctx) {
    let {
      page = 1,
      pageSize = 5,
      ename = '',
      status = '',
      wid = '',
    } = ctx.request.body
    page = Math.max(page, 1)
    pageSize = Math.max(pageSize, 1)
    // if (status === '') {
    //   status = [{ status: 1 }, { status: 2 }, { status: 3 }]
    // } else {
    //   status = [{ status }]
    // }
    const { count, rows } = await Employees.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: ['id'],
      where: {
        ename: {
          [Op.like]: `${ename}%`,
        },
        wid: {
          [Op.like]: `${wid}%`,
        },
        status: {
          [Op.like]: `${status}%`,
        },
      },
      attributes: {
        include: [
          [sequelize.col('j.job'), 'job'],
          [sequelize.col('d.dname'), 'department'],
        ],
      },
      include: [
        {
          model: Job,
          as: 'j',
          attributes: [],
        },
        {
          model: Department,
          as: 'd',
          attributes: [],
        },
      ],
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

  // 创建/更新员工
  async update(ctx) {
    const { id } = ctx.request.body
    if (id) {
      ctx.verifyParams({
        wid: { type: 'string', require: false },
        ename: { type: 'string', require: false },
        sex: { type: 'string', require: false },
        married: { type: 'number', require: false },
        education: { type: 'number', require: false },
        tel: { type: 'string', require: false },
        job_id: { type: 'number', require: false },
        dept_id: { type: 'number', require: false },
        hiredate: { type: 'string', require: false },
        status: { type: 'number', require: false },
      })
      const repeatedId = await Employees.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '员工不存在')
      }
      await Employees.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        wid: { type: 'string', require: true },
        ename: { type: 'string', require: true },
        sex: { type: 'string', require: true },
        married: { type: 'number', require: true },
        education: { type: 'number', require: true },
        tel: { type: 'string', require: true },
        job_id: { type: 'number', require: true },
        dept_id: { type: 'number', require: true },
        hiredate: { type: 'string', require: true },
        status: { type: 'number', require: true },
      })
      await Employees.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除部门
  async delete(ctx) {
    const { id } = ctx.request.body
    await Employees.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new EmployeesCtl()
