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
