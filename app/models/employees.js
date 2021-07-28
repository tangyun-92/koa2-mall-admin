/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-28 11:30:18
 * 员工模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Employee = sequelize.define(
  'Employees',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // 工号
    wid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    // 婚否
    married: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    // 学历
    education: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    tel: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 职务id
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // 部门id
    dept_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // 上司id
    mar_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 入职日期
    hiredate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // 离职日期
    termdate: {
      type: DataTypes.DATE,
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
    tableName: 't_emp',
  }
)

module.exports = Employee