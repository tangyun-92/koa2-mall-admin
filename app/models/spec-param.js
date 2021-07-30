/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-30 15:35:46
 * 参数模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const SpecParam = sequelize.define(
  'SpecParams',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // 品类ID
    spg_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    // 参数编号
    spp_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 是否为数字参数
    numeric: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    // 单位
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 是否为通用参数
    generic: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    // 是否用于通用搜索
    searching: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    // 参数值
    segements: {
      type: DataTypes.STRING,
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
    tableName: 't_spec_param',
  }
)

module.exports = SpecParam
