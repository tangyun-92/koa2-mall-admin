/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-06 09:02:39
 * 商品零售店关联模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Good = require('./goods')

const ShopGood = sequelize.define(
  'ShopGoods',
  {
    // 零售店id
    shop_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    // 商品id
    sku_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    // 数量
    num: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    // 单位
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 't_shop_sku',
    timestamps: false,
  }
)

ShopGood.belongsTo(Good, {
  foreignKey: 'sku_id',
  targetKey: 'id',
  as: 'g',
})

module.exports = ShopGood