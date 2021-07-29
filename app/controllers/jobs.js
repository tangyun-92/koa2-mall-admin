/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-29 11:13:58
 * 职位
 */
const Job = require('../models/jobs')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const { returnCtxBody } = require('../utils/index')

class JobCtl {
  // 获取职位列表
  async find(ctx) {
    let { page = 1, pageSize = 5, job = '' } = ctx.request.body
    page = Math.max(page, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await Job.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: ['id'],
      where: {
        job: {
          [Op.or]: {
            [Op.like]: `%${job}%`,
            [Op.eq]: job ? job : false,
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

  // 创建/更新职位
  async update(ctx) {
    const { id, job } = ctx.request.body
    const repeatedJob = await Job.findOne({ where: { job } })
    if (repeatedJob && repeatedJob.dataValues.id !== id) {
      ctx.throw(200, '职位名称已存在')
    }
    if (id) {
      ctx.verifyParams({
        job: { type: 'string', require: false },
      })
      const repeatedId = await Job.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '职位不存在')
      }
      await Job.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        job: { type: 'string', require: true },
      })
      await Job.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除职位
  async delete(ctx) {
    const { id } = ctx.request.body
    await Job.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new JobCtl()
