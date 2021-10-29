/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-29 16:28:46
 * 商品操作记录表
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const PmsProductOperateLog = sequelize.define(
  'PmsProductOperateLogs',
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
    price_old: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    price_new: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    sale_price_old: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    sale_price_new: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    gift_point_old: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gift_point_new: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    use_point_limit_old: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    use_point_limit_new: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    operate_man: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    create_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'pms_product_operate_log',
    timestamps: false,
  }
)

module.exports = PmsProductOperateLog