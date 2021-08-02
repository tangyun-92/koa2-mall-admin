/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-30 13:34:51
 * 品牌模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Category = sequelize.define(
  'Categorys',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    // 是否含有下级分类
    if_parent: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    // 排名指数
    sort: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.TINYINT,
      allowNull: true,
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
    tableName: 't_category',
  }
)

module.exports = Category