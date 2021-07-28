/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:48:48 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-28 14:39:16
 * 用户模型
 */
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('./db')
const Employee = require('./employees')
const Role = require('./roles')

const User = sequelize.define(
  'Users',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emp_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_deleted: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      default: 0
    },
  },
  {
    tableName: 't_user',
    // timestamps: false,
    freezeTableName: true, // 是否不需要以s结尾
  }
)

User.belongsTo(Role, { foreignKey: 'role_id', targetKey: 'id', as: 'rol' }) // 如果对应 Role 关联的是主键则不用写 targetKey，否则需要 targetKey: id
User.belongsTo(Employee, { foreignKey: 'emp_id', targetKey: 'id', as: 'emp' })

module.exports = User