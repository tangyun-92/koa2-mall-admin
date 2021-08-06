/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-06 11:05:13
 * 商品供应商关联模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Good = require('./goods')

const SupplierGood = sequelize.define(
  'SupplierGoods',
  {
    // 仓库id
    supplier_id: {
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
  },
  {
    tableName: 't_supplier_sku',
    timestamps: false,
  }
)

SupplierGood.belongsTo(Good, {
  foreignKey: 'sku_id',
  targetKey: 'id',
  as: 'g',
})

module.exports = SupplierGood