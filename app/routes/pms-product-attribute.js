/*
 * @Author: 唐云 
 * @Date: 2021-10-09 15:19:41 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-09 15:55:51
 * 商品属性路由
 */

const Router = require('koa-router')
const router = new Router({ prefix: '/pms/product-attribute' })
const jwt = require('koa-jwt')

const {
  find,
  update,
  delete: del,
} = require('../controllers/pms-product-attribute')

const { secret } = require('../config/jwt')

/**
 * 认证中间件
 */
const auth = jwt({ secret }) // 生成的用户信息在ctx.state上

router.post('/list', auth, find)
router.post('/update', auth, update)
router.post('/delete', auth, del)

module.exports = router
