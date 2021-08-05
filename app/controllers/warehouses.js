/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-05 16:41:15
 * 仓库
 */
const Warehouse = require('../models/warehouses')
const { Op } = require('sequelize')
const { returnCtxBody } = require('../utils/index')
const sequelize = require('../models/db')
const City = require('../models/citys')
const WarehouseGood = require('../models/warehouse-goods')
const Good = require('../models/goods')

class WarehouseCtl {
  // 获取仓库列表
  async find(ctx) {
    let { page = 1, pageSize = 5, city_id = '' } = ctx.request.body
    page = Math.max(page, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await Warehouse.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: ['id'],
      where: {
        city_id: {
          [Op.like]: `${city_id === null ? '' : city_id}%`,
        },
      },
      attributes: {
        include: [
          [sequelize.col('c.city'), 'city'],
          [sequelize.col('c.province_id'), 'province_id']
        ],
      },
      include: [
        {
          model: City,
          as: 'c',
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

  // 获取指定仓库下商品列表
  async findShop(ctx) {
    let { warehouse_id } = ctx.request.body
    const data = await WarehouseGood.findAll({
      order: ['sku_id'],
      where: {
        warehouse_id,
      },
      attributes: {
        include: [
          [sequelize.col('g.title'), 'shop_name'],
        ]
      }, // 显示过滤的字段
      include: [
        {
          model: Good,
          as: 'g',
          attributes: [],
        }
      ],
    })
    ctx.body = returnCtxBody({
      data: {
        records: data,
      },
    })
  }

  // 创建/更新仓库
  async update(ctx) {
    const { id } = ctx.request.body
    if (id) {
      ctx.verifyParams({
        city_id: { type: 'number', require: false },
        address: { type: 'string', require: false },
        tel: { type: 'string', require: false },
      })
      const repeatedId = await Warehouse.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '仓库不存在')
      }
      await Warehouse.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        city_id: { type: 'number', require: true },
        address: { type: 'string', require: true },
        tel: { type: 'string', require: true },
      })
      await Warehouse.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除仓库
  async delete(ctx) {
    const { id } = ctx.request.body
    await Warehouse.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new WarehouseCtl()
