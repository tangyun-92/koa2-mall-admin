/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-04 14:19:23
 * 客户
 */
const Customer = require('../models/customers')
const jsonwebtoken = require('jsonwebtoken')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const { secret } = require('../config/jwt')
const { returnCtxBody } = require('../utils/index')
const Level = require('../models/levels')

class CustomerCtl {
  // 登录
  // async login(ctx) {
  //   ctx.verifyParams({
  //     username: { type: 'string', required: true },
  //     password: { type: 'string', required: true },
  //   })
  //   const { username, password } = ctx.request.body
  //   const user = await Customer.findOne({ where: { username } })
  //   if (!user) {
  //     ctx.throw(200, '客户不存在')
  //   }
  //   if (username !== user.username || password !== user.password) {
  //     ctx.throw(200, '账号或密码错误')
  //   }
  //   // 生成token
  //   const token = jsonwebtoken.sign(
  //     { id: user.id, username: user.username },
  //     secret,
  //     { expiresIn: '1d' }
  //   )
  //   ctx.body = {
  //     data: { token, username },
  //     status: 200,
  //     message: '登录成功',
  //     result: true,
  //   }
  // }

  // 获取客户列表
  async find(ctx) {
    let {
      page = 1,
      pageSize = 5,
      username = ''
    } = ctx.request.body
    pageSize = Math.max(pageSize, 1)
    page = Math.max(page, 1)
    const { count, rows } = await Customer.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: ['id'],
      where: {
        is_deleted: 0, // 0 表示未被删除的数据
        username: {
          [Op.like]: `${username}%`,
        }
      },
      attributes: {
        include: [
          [sequelize.col('l.level'), 'level']
        ],
        exclude: ['password'],
      }, // 显示过滤的字段
      include: [
        {
          model: Level,
          as: 'l',
          attributes: [],
        }
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

  // 创建/更新客户
  async update(ctx) {
    let { id, username } = ctx.request.body
    const repeatedCustomer = await Customer.findOne({ where: { username } })
    if (repeatedCustomer && repeatedCustomer.dataValues.id !== id) {
      ctx.throw(200, '客户名已存在')
    }
    // 如果 id 存在执行更新操作，不存在执行新增操作
    if (id) {
      ctx.verifyParams({
        username: { type: 'string', require: false }
      })
      const repeatedId = await Customer.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '客户不存在')
      }
      await Customer.update(ctx.request.body, {
        where: { id },
      })
    } else {
      ctx.verifyParams({
        username: { type: 'string', require: true }
      })
      await Customer.create({
        ...ctx.request.body,
        password: '4YS8pXDMcZNSqEymv0uxDg==', // 默认密码 123456
      })
    }
    ctx.body = returnCtxBody({})
  }

  // 删除客户
  async delete(ctx) {
    const { id } = ctx.request.body
    await Customer.update(
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

  // 修改密码
  async updatePassword(ctx) {
    ctx.verifyParams({
      password: { type: 'string', require: true },
    })
    const { id } = ctx.request.body
    await Customer.update(ctx.request.body, { where: { id } })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new CustomerCtl()
