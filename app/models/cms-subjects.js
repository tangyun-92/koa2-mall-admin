/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-25 14:12:57
 * 专题模型
 */
const { DataTypes } = require('sequelize')
const SubjectCategory = require('./cms-subject-category')
const sequelize = require('./db')

const Subject = sequelize.define(
  'Subjects',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // 分类id
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 图片
    pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 产品个数
    product_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 是否推荐
    recommend_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 发布时间
    create_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 收藏数
    collect_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 阅读数
    read_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 评价数
    comment_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 相册
    album_pics: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 描述
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 是否显示
    show_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 内容
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // 转发数、分享数
    forward_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 分类名称
    category_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'cms_subject',
    timestamps: false,
  }
)

Subject.belongsTo(SubjectCategory, {
  foreignKey: 'category_id',
  targetKey: 'id',
  as: 'c',
})

module.exports = Subject