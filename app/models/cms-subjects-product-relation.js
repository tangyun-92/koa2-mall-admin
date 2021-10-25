/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-25 16:35:46
 * 专题产品关联表模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const SubjectProductRelation = sequelize.define(
  'SubjectProductRelations',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // 专题id
    subject_id: {
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
    tableName: 'cms_subject_product_relation',
    timestamps: false,
  }
)

module.exports = SubjectProductRelation