/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:48:48 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-04 11:15:13
 * 客户模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Level = require('./levels')

const Customer = sequelize.define(
  'Customers',
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
    wechat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tel: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    level_id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    is_deleted: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      default: 0,
    },
  },
  {
    tableName: 't_customer',
    // timestamps: false,
    freezeTableName: true, // 是否不需要以s结尾
  }
)

Customer.belongsTo(Level, { foreignKey: 'level_id', targetKey: 'id', as: 'l' }) // 如果对应 Role 关联的是主键则不用写 targetKey，否则需要 targetKey: id

module.exports = Customer