/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-05 16:39:02
 * 商品仓库关联模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Warehouse = require('./warehouses')
const Good = require('./goods')

const WarehouseGood = sequelize.define(
  'WarehouseGoods',
  {
    // 仓库id
    warehouse_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    // 商品id
    sku_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    // 数量
    num: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    // 单位
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 't_warehouse_sku',
    timestamps: false,
  }
)

WarehouseGood.belongsTo(Warehouse, {
  foreignKey: 'warehouse_id',
  targetKey: 'id',
  as: 'w',
})
WarehouseGood.belongsTo(Good, {
  foreignKey: 'sku_id',
  targetKey: 'id',
  as: 'g',
})

module.exports = WarehouseGood