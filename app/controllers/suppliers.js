/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-11 14:52:36
 * 供货商
 */
const Supplier = require('../models/suppliers')
const { Op } = require('sequelize')
const { returnCtxBody } = require('../utils/index')
const sequelize = require('../models/db')
const City = require('../models/citys')
const SupplierGood = require('../models/supplier-goods')
// const Good = require('../models/goods')

class SupplierCtl {
  // 获取供货商列表
  async find(ctx) {
    let { page = 1, pageSize = 5, status = '', type = '', code = '' } = ctx.request.body
    page = Math.max(page, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await Supplier.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: ['id'],
      where: {
        status: {
          [Op.like]: `${status === null ? '' : status}%`,
        },
        type: {
          [Op.like]: `${type === null ? '' : type}%`,
        },
        code: {
          [Op.like]: `${code === null ? '' : code}%`,
        },
      },
      // attributes: {
      //   include: [
      //     [sequelize.col('c.city'), 'city'],
      //     [sequelize.col('c.province_id'), 'province_id'],
      //   ],
      // },
      // include: [
      //   {
      //     model: City,
      //     as: 'c',
      //     attributes: [],
      //   },
      // ],
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

  // 获取指定供货商下所供应的商品列表
  async findShop(ctx) {
    let { supplier_id } = ctx.request.body
    const data = await SupplierGood.findAll({
      order: ['sku_id'],
      where: {
        supplier_id,
      },
      // attributes: {
      //   include: [[sequelize.col('g.title'), 'shop_name']],
      // }, // 显示过滤的字段
      // include: [
      //   {
      //     model: Good,
      //     as: 'g',
      //     attributes: [],
      //   },
      // ],
    })
    ctx.body = returnCtxBody({
      data: {
        records: data,
      },
    })
  }

  // 创建/更新供货商
  async update(ctx) {
    const { id, code } = ctx.request.body
    const repeatedSupplier = await Supplier.findOne({ where: { code } })
    if (repeatedSupplier && repeatedSupplier.dataValues.id !== id) {
      ctx.throw(200, '供货商编号已存在')
    }
    if (id) {
      ctx.verifyParams({
        code: { type: 'string', require: false },
        name: { type: 'string', require: false },
        type: { type: 'number', require: false },
        like_man: { type: 'string', require: false },
        tel: { type: 'string', require: false },
        address: { type: 'string', require: false },
        status: { type: 'number', require: false },
      })
      const repeatedId = await Supplier.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '供货商不存在')
      }
      await Supplier.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        code: { type: 'string', require: true },
        name: { type: 'string', require: true },
        type: { type: 'number', require: true },
        like_man: { type: 'string', require: true },
        tel: { type: 'string', require: true },
        address: { type: 'string', require: true },
        status: { type: 'number', require: true },
      })
      await Supplier.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除供货商
  async delete(ctx) {
    const { id } = ctx.request.body
    await Supplier.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new SupplierCtl()
