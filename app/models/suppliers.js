/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-06 11:00:31
 * 供货商模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
// const Brand = require('./brands')

const Supplier = sequelize.define(
  'Suppliers',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // 供货商编号
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 供货商类型 - 1厂家 2代理商 3个人
    type: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    // 联系人
    like_man: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 开户银行名称
    bank_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 银行账号
    bank_account: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
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
  },
  {
    tableName: 't_supplier',
  }
)

// Supplier.belongsTo(Brand, { foreignKey: 'brand_id', targetKey: 'id', as: 'b'})

module.exports = Supplier