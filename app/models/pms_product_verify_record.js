/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-29 14:14:46
 * 商品审核记录表
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const PmsProductVerifyRecord = sequelize.define(
  'PmsProductVerifyRecords',
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
    create_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verify_man: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'pms_product_verify_record',
    timestamps: false,
  }
)

module.exports = PmsProductVerifyRecord