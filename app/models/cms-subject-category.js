/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-25 11:27:58
 * 专题分类模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const SubjectCategory = sequelize.define(
  'SubjectCategorys',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // 分类id
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subject_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    show_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    tableName: 'cms_subject_category',
    timestamps: false,
  }
)

module.exports = SubjectCategory