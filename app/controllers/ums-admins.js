/*
 * @Author: 唐云 
 * @Date: 2021-10-08 09:20:23 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-08 13:18:28
 * 用户
 */
const jsonwebtoken = require('jsonwebtoken')
const Admin = require('../models/ums-admins')
const { Op } = require('sequelize')
const { returnCtxBody, formData } = require('../utils/index')
const { secret } = require('../config/jwt')

class AdminCtl {
  /**
   * 获取用户列表
   * @param {*} ctx
   */
  async find(ctx) {
    let {
      currentPage = 1,
      pageSize = 5,
      username = '',
      status = '',
    } = ctx.request.body
    pageSize = Math.max(pageSize, 1)
    currentPage = Math.max(currentPage, 1)
    const { count, rows } = await Admin.findAndCountAll({
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      order: [['id', 'DESC']],
      where: {
        username: {
          [Op.like]: `%${username}%`,
        },
        status: {
          [Op.like]: status ? `${status}` : `%${status}%`,
        },
      },
      attributes: {
        exclude: ['password'],
      }, // 显示过滤的字段
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

  // 创建/更新用户
  async update(ctx) {
    const { id, username } = ctx.request.body
    const repeatedAdmin = await Admin.findOne({ where: { username } })
    if (repeatedAdmin && repeatedAdmin.dataValues.id !== id) {
      ctx.throw(200, '用户名已存在')
    }
    // 如果 id 存在执行更新操作，不存在执行新增操作
    if (id) {
      ctx.verifyParams({
        username: { type: 'string', require: false },
      })
      const repeatedId = await Admin.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '用户不存在')
      }
      await Admin.update(ctx.request.body, {
        where: { id },
      })
    } else {
      ctx.verifyParams({
        username: { type: 'string', require: true },
      })
      const time = Date.now()
      await Admin.create({
        ...ctx.request.body,
        password: '4YS8pXDMcZNSqEymv0uxDg==', // 默认密码 123456
        create_time: formData(time), // 创建时间
      })
    }
    ctx.body = returnCtxBody({})
  }

  // 登录
  async login(ctx) {
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const { username, password } = ctx.request.body
    const user = await Admin.findOne({ where: { username } })
    if (!user) {
      ctx.throw(200, '用户不存在')
    }
    if (user.status === 0) {
      ctx.throw(200, '用户已被禁用')
    }
    if (username !== user.username || password !== user.password) {
      ctx.throw(200, '账号或密码错误')
    }
    // 生成token
    const token = jsonwebtoken.sign(
      { id: user.id, username: user.username },
      secret,
      { expiresIn: '1d' }
    )
    ctx.body = {
      data: { token, username },
      status: 200,
      message: '登录成功',
      result: true,
    }
  }

  // 启用/禁用用户
  async changeStatus(ctx) {
    const { id, status } = ctx.request.body
    if (status !== 0 && status !== 1) {
      ctx.throw(200, 'status只能为0或者1')
    }
    await Admin.update(
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

  // 删除用户
  async delete(ctx) {
    const { id } = ctx.request.body
    await Admin.destroy(
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

  // 修改密码
  async updatePassword(ctx) {
    ctx.verifyParams({
      password: { type: 'string', require: true },
    })
    const { id } = ctx.request.body
    await Admin.update(ctx.request.body, { where: { id } })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new AdminCtl()