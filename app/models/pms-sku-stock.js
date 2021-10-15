/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-15 15:45:47
 * 商品sku表
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const PmsSkuStock = sequelize.define(
  'PmsSkuStocks',
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
    sku_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    low_stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sale: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    promotion_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    lock_stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sp_data: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'pms_sku_stock',
    timestamps: false,
  }
)

module.exports = PmsSkuStock