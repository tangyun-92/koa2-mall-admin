/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-05 14:50:33
 * 省份模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Province = sequelize.define(
  'Provinces',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 't_province',
    timestamps: false,
  }
)

module.exports = Province