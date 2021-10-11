/*
 * @Author: 唐云 
 * @Date: 2021-10-09 15:12:23 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-09 15:55:31
 * 商品属性模型
 */

const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const PmsProductAttribute = sequelize.define(
  'PmsProductAttributes',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_attribute_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 属性是否可选
    select_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 属性录入方式
    input_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 可选值列表，以逗号隔开
    input_list: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 分类筛选样式
    filter_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 检索类型
    search_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 相同属性产品是否关联
    related_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 是否支持手动新增
    hand_add_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 属性的类型
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'pms_product_attribute',
    timestamps: false,
  }
)

module.exports = PmsProductAttribute
