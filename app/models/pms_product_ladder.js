/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-29 10:38:49
 * 商品阶梯价格模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const PmsProductLadder = sequelize.define(
  'PmsProductLadders',
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
    count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    tableName: 'pms_product_ladder',
    timestamps: false,
  }
)

module.exports = PmsProductLadder