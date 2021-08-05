/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-05 15:25:42
 * 城市模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const City = sequelize.define(
  'Citys',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: 't_city',
    timestamps: false,
  }
)

module.exports = City