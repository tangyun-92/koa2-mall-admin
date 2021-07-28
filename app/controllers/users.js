/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-28 16:50:44
 * 用户
 */
const User = require('../models/users')
const Role = require('../models/roles')
const Employee = require('../models/employees')
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
    // 如果status为空，默认选中启用与停用的数据
    if (status === '') {
      status = [{ status: 0 }, { status: 1 }]
    } else {
      status = [{ status }]
    }
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
        [Op.or]: status,
      },
      attributes: {
        include: [
          [sequelize.col('rol.role'), 'role'],
          [sequelize.col('emp.ename'), 'employee'],
        ],
        exclude: ['password'],
      }, // 显示过滤的字段
      include: [
        {
          model: Role,
          as: 'rol',
          attributes: [],
        },
        {
          model: Employee,
          as: 'emp',
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

  // 创建/更新用户
  async update(ctx) {
    const { id, username } = ctx.request.body
    const repeatedUser = await User.findOne({ where: { username } })
    if (repeatedUser && repeatedUser.dataValues.id !== id) {
      ctx.throw(200, '用户名已存在')
    }
    // 如果 id 存在执行更新操作，不存在执行新增操作
    if (id) {
      ctx.verifyParams({
        username: { type: 'string', require: false },
        emp_id: { type: 'number', require: false },
        role_id: { type: 'number', require: false },
        status: { type: 'number', require: false },
      })
      const repeatedId = await User.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '用户不存在')
      }
      await User.update(ctx.request.body, {
        where: { id },
      })
    } else {
      ctx.verifyParams({
        username: { type: 'string', require: true },
        emp_id: { type: 'number', require: true },
        role_id: { type: 'number', require: true },
        status: { type: 'number', require: true },
      })
      await User.create({
        ...ctx.request.body,
        password: '4YS8pXDMcZNSqEymv0uxDg==', // 默认密码 123456
      })
    }
    ctx.body = returnCtxBody({})
  }

  // 删除用户
  async delete(ctx) {
    const { id } = ctx.request.body
    await User.update(
      { is_deleted: 1 },
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

  // 启用/禁用用户状态
  async changeStatus(ctx) {
    const { id, status } = ctx.request.body
    if (status !== 0 && status !== 1) {
      ctx.throw(200, 'status只能为0或者1')
    }
    await User.update(
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

  // 修改密码
  async updatePassword(ctx) {
    ctx.verifyParams({
      password: { type: 'string', require: true },
    })
    const { id } = ctx.request.body
    await User.update(ctx.request.body, { where: { id } })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new UserCtl()
