/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-08 14:39:36
 * 角色模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Role = sequelize.define(
  'Roles',
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    admin_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    create_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'ums_role',
    timestamps: false,
  }
)

module.exports = Role