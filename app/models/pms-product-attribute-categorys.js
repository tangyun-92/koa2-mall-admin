/*
 * @Author: 唐云 
 * @Date: 2021-10-09 15:12:23 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-09 15:14:32
 * 商品类型模型
 */

const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const PmsProductAttributeCategory = sequelize.define(
  'PmsProductAttributeCategorys',
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
    // 属性数量
    attribute_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 参数数量
    param_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'pms_product_attribute_category',
    timestamps: false,
  }
)

module.exports = PmsProductAttributeCategory
