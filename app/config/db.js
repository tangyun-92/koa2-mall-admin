const env = process.env.NODE_ENV

let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: '172.16.11.25',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'ball'
  }
}

module.exports = {
  MYSQL_CONF
}