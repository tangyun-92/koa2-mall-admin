/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-05 17:00:15
 * 零售店模型
 */
const { DataTypes } = require('sequelize')
const City = require('./citys')
const sequelize = require('./db')

const Shop = sequelize.define(
  'Shops',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
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
    tableName: 't_shop',
  }
)

Shop.belongsTo(City, { foreignKey: 'city_id', targetKey: 'id', as: 'c' })

module.exports = Shop