/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-02 17:16:09
 * 商品模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Product = require('./products')

const Good = sequelize.define(
  'Goods',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    spu_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    param: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    saleable: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    valid: {
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
    tableName: 't_sku',
  }
)

Good.belongsTo(Product, { foreignKey: 'spu_id', targetKey: 'id', as: 'p' })

module.exports = Good