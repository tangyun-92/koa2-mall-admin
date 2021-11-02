/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:48
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-11-02 14:34:48
 * 用户日志模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const AdminLoginLog = sequelize.define(
  'AdminLoginLogs',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    create_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'ums_admin_login_log',
    timestamps: false,
    freezeTableName: true, // 是否不需要以s结尾
  }
)

module.exports = AdminLoginLog
