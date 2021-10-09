/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-09 09:48:12
 * 商品分类模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const PmsProductCategory = sequelize.define(
  'PmsProductCategorys',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 分类等级
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 商品数量
    product_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 商品单位
    product_unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 是否显示在导航栏
    nav_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 显示状态
    show_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 排序
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 关键字
    keywords: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 描述
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'pms_product_category',
    timestamps: false,
  }
)

module.exports = PmsProductCategory