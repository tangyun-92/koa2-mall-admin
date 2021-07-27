/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-27 17:17:04
 * 用户
 */
const User = require('../models/users')
const Role = require('../models/roles')
const jsonwebtoken = require('jsonwebtoken')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const { secret } = require('../config/jwt')
const { returnCtxBody } = require('../utils/index')

class UserCtl {
  // 登录
  async login(ctx) {
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const { username, password } = ctx.request.body
    const user = await User.findOne({ where: { username } })
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    if (user.status === 0) {
      ctx.throw(400, '用户已被禁用')
    }
    if (username !== user.username || password !== user.password) {
      ctx.throw(400, '账号或密码错误')
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

  // 获取用户列表
  async find(ctx) {
    let {
      page = 1,
      pageSize = 5,
      username = '',
      status = '',
    } = ctx.request.body
    pageSize = Math.max(pageSize, 1)
    page = Math.max(page, 1)
    const { count, rows } = await User.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: ['id'],
      where: {
        is_deleted: 0, // 0 表示未被删除的数据
        username: {
          [Op.or]: {
            [Op.like]: `%${username}%`,
            [Op.eq]: username ? username : false,
          },
        },
        status: status === 0 ? status : 1 // 默认选中启用状态的数据
      },
      attributes: {
        include: [[sequelize.col('r.role'), 'role']],
        exclude: ['password', 'role_id'],
      }, // 显示过滤的字段
      include: {
        model: Role,
        as: 'r',
        attributes: [],
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

  // 新增用户
  async create(ctx) {
    ctx.verifyParams({
      username: { type: 'string', require: true },
      password: { type: 'string', require: true },
      emp_id: { type: 'number', require: true },
      role_id: { type: 'number', require: true },
      status: { type: 'number', require: true },
    })
    const { username } = ctx.request.body
    const repeatedUser = await User.findOne({ where: { username } })
    if (repeatedUser) {
      ctx.throw(409, '用户已存在')
    }
    const user = await User.create(ctx.request.body)
    ctx.body = returnCtxBody({})
  }

  // 更新用户
  async update(ctx) {
    ctx.verifyParams({
      username: { type: 'string', require: false },
      password: { type: 'string', require: false },
      emp_id: { type: 'number', require: false },
      role_id: { type: 'number', require: false },
      status: { type: 'number', require: false },
    })
    const { id, username } = ctx.request.body
    const repeatedId = await User.findByPk(id)
    const repeatedUser = await User.findOne({ where: { username }})
    if (!repeatedId) {
      ctx.throw(404, '用户不存在')
    }
    if (repeatedUser.dataValues.id !== id) {
      ctx.throw(409, '用户名已存在')
    }
    const user = await User.update(ctx.request.body, {
      where: { id },
    })
    ctx.body = returnCtxBody({})
  }

  // 删除用户
  async delete(ctx) {
    const { id } = ctx.request.body
    const repeatedUser = await User.findByPk(id)
    if (!repeatedUser) {
      ctx.throw(404, '用户不存在')
    }
    await User.update({ is_deleted: 1 }, { where: { id } })
    ctx.body = returnCtxBody({})
  }

  // 启用/禁用用户状态
  async changeStatus(ctx) {
    const { id } = ctx.request.body
    const repeatedUser = await User.findByPk(id)
    if (!repeatedUser) {
      ctx.throw(404, '用户不存在')
    }
    const { status } = ctx.request.body
    if (status !== 0 && status !== 1) {
      ctx.throw(400, 'status只能为0或者1')
    }
    await User.update({ status }, { where: { id } })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new UserCtl()
