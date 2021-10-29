/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-29 13:39:37
 * 商品满减价格模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const PmsProductFullReduction = sequelize.define(
  'PmsProductFullReductions',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    full_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    reduce_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    tableName: 'pms_product_full_reduction',
    timestamps: false,
  }
)

module.exports = PmsProductFullReduction