/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-03 17:02:43
 * 会员等级模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Level = sequelize.define(
  'Levels',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // 等级
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 折扣
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
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
    tableName: 't_level',
  }
)

module.exports = Level