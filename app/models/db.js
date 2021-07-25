/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:50:02 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-25 21:50:28
 * sequelize数据库配置
 */
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config/db')

const sequelize = new Sequelize(
  MYSQL_CONF.database,
  MYSQL_CONF.user,
  MYSQL_CONF.password,
  {
    host: MYSQL_CONF.host,
    dialect: 'mysql',
    // 格式化时间
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+08:00', //改为标准时区
  }
)

module.exports = sequelize
