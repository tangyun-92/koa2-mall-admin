/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-29 15:39:15
 * 员工模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Job = require('./jobs')
const Department = require('./departments')

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
    // 婚否：1已婚 2未婚
    married: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    // 学历：1大专 2本科 3研究生 4博士 5其他
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
    mgr_id: {
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
    // 状态：1在职 2休假 3离职
    status: {
      type: DataTypes.TINYINT,
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
    tableName: 't_emp',
  }
)

Employee.belongsTo(Job, { foreignKey: 'job_id', targetKey: 'id', as: 'j' })
Employee.belongsTo(Department, { foreignKey: 'dept_id', targetKey: 'id', as: 'd' })

module.exports = Employee
