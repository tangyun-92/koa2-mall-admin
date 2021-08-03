/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-03 17:05:38
 * 会员等级
 */
const Level = require('../models/levels')
const { Op } = require('sequelize')
const { returnCtxBody } = require('../utils/index')

class LevelCtl {
  // 获取会员等级列表
  async find(ctx) {
    const levels = await Level.findAll({
      order: ['id']
    })
    ctx.body = returnCtxBody({
      data: {
        records: levels,
      },
    })
  }

  // 创建/更新会员等级
  async update(ctx) {
    const { id, level } = ctx.request.body
    const repeatedLevel = await Level.findOne({ where: { level } })
    if (repeatedLevel && repeatedLevel.dataValues.id !== id) {
      ctx.throw(200, '会员等级名称已存在')
    }
    if (id) {
      ctx.verifyParams({
        level: { type: 'string', require: false },
        discount: { type: 'number', require: false },
      })
      const repeatedId = await Level.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '会员等级不存在')
      }
      await Level.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        level: { type: 'string', require: true },
        discount: { type: 'number', require: true },
      })
      await Level.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除会员等级
  async delete(ctx) {
    const { id } = ctx.request.body
    await Level.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new LevelCtl()
