/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-09 09:41:34
 * 产品模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
// const Category = require('../models/categorys')
const SpecGroup = require('../models/spec-group')

const Product = sequelize.define(
  'Products',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    spg_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    saleable: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false
    },
    valid: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false
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
    tableName: 't_spu',
  }
)

// Product.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'id', as: 'c'})
Product.belongsTo(SpecGroup, {
  foreignKey: 'spg_id',
  targetKey: 'spg_id',
  as: 's',
})

module.exports = Product