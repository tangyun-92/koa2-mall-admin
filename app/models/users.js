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
    create_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    last_update_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  },
  {
    tableName: 't_user',
    timestamps: false,
    freezeTableName: true, // 是否不需要以s结尾
  }
)

module.exports = User