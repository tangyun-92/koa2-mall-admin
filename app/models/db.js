const Sequelize = require('sequelize')

const sequelize = new Sequelize('ball', 'root', '123456', {
  host: '172.16.11.25',
  dialect: 'mysql',
  // 格式化时间
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  },
  timezone: '+08:00', //改为标准时区
})

module.exports = sequelize