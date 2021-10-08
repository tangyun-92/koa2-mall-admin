/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:48
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-08 11:26:12
 * 用户模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Admin = sequelize.define(
  'Admins',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nick_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 备注
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    create_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    login_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'ums_admin',
    timestamps: false,
    freezeTableName: true, // 是否不需要以s结尾
  }
)

module.exports = Admin
