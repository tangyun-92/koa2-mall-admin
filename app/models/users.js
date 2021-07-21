const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('./db')

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
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    // timestamps: false,
    freezeTableName: true, // 是否不需要以s结尾
  }
)

module.exports = User