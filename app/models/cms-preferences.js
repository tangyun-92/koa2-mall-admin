/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-25 15:05:32
 * 优选主题模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Preference = sequelize.define(
  'Preferences',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sub_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 是否显示
    show_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'cms_preference_area',
    timestamps: false,
  }
)

module.exports = Preference