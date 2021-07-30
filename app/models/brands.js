/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-30 09:35:40
 * 品牌模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Brand = sequelize.define(
  'Brands',
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
    // 品牌图片
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 品牌首字母
    letter: {
      type: DataTypes.STRING,
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
    tableName: 't_brand',
  }
)

module.exports = Brand