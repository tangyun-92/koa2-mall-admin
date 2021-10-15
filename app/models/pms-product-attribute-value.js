/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-15 14:48:12
 * 商品属性值表
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const PmsProductAttributeValue = sequelize.define(
  'PmsProductAttributeValues',
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
    product_attribute_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'pms_product_attribute_value',
    timestamps: false,
  }
)

module.exports = PmsProductAttributeValue