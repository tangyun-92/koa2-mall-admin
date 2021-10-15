/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:05 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-11 14:57:59
 * 商品模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const ProductCategory = require('./pms-product-categorys')
const Brand = require('./pms-brands')

const Product = sequelize.define(
  'Products',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // 品牌id
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 商品分类id
    product_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 运费模版id
    freight_template_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 商品属性分类id
    product_attribute_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 价格
    pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 货号
    product_sn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 删除状态
    delete_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 上架状态
    publish_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 新品状态
    new_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 推荐状态
    recommend_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 审核状态
    verify_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 销量
    sale: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    // 促销价
    promotion_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    // 赠送的成长值
    gift_growth: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 赠送的积分
    gift_point: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 限制使用的积分数
    use_point_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 副标题
    sub_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 商品描述
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // 市场价
    original_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    // 库存
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 库存预警值
    low_stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 单位
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 商品重量，默认为克
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    // 是否为预告商品
    preview_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 以逗号分割的产品服务
    service_ids: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 关键字
    keywords: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 备注
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 画册图片，连产品图片限制为5张，以逗号分隔
    album_pics: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 详情标题
    detail_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 详情描述
    detail_desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // 产品详情网页内容
    detail_html: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // 移动端网页详情
    detail_mobile_html: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // 促销开始时间
    promotion_start_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 促销结束时间
    promotion_end_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 活动限购数量
    promotion_per_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 促销类型
    promotion_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 产品分类名称
    product_category_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 品牌名称
    brand_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'pms_product',
    timestamps: false
  }
)

Product.belongsTo(ProductCategory, {
  foreignKey: 'product_category_id',
  targetKey: 'id',
  as: 'pc',
})
Product.belongsTo(Brand, {
  foreignKey: 'brand_id',
  targetKey: 'id',
  as: 'b',
})

module.exports = Product