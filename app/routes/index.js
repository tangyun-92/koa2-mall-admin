/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:49:31 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-25 21:49:53
 * 全局处理路由路径
 */
const fs = require('fs')

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return 
    const route = require(`./${file}`)
    app.use(route.routes()).use(route.allowedMethods())
  })
}