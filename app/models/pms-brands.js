/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-08 16:10:00
 * 品牌模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Brand = sequelize.define(
  'Brands',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 品牌首字母
    first_letter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 是否为品牌制造商
    factory_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 是否显示
    show_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 产品数量
    product_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 产品数量
    product_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 产品评论数量
    product_comment_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 品牌图片
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 专区大图
    big_pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 品牌故事
    brand_story: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'pms_brand',
    timestamps: false
  }
)

module.exports = Brand