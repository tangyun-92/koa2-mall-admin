/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-25 16:56:54
 * 优选产品关联表模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const PreferenceAreaProductRelation = sequelize.define(
  'PreferenceAreaProductRelations',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // 优选id
    preference_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 产品id
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'cms_preference_area_product_relation',
    timestamps: false,
  }
)

module.exports = PreferenceAreaProductRelation