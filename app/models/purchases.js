/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-06 10:22:29
 * 采购模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
// const Brand = require('./brands')

const Purchase = sequelize.define(
  'Purchases',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    sku_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    num: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    warehouse_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    in_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    out_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    buyer_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 't_purchase',
  }
)

// Purchase.belongsTo(Brand, { foreignKey: 'brand_id', targetKey: 'id', as: 'b'})

module.exports = Purchase