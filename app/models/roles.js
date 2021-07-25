/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by:   唐云 
 * @Last Modified time: 2021-07-25 21:49:05 
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
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 't_role',
    timestamps: false
  }
)

module.exports = Role