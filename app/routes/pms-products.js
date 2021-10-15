/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:48:41 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-15 10:13:14
 * 商品路由
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/pms/products' })
const jwt = require('koa-jwt')

const {
  find,
  update,
  delete: del,
  upload,
  detail
} = require('../controllers/pms-products')

const { secret } = require('../config/jwt')

/**
 * 认证中间件
 */
const auth = jwt({ secret }) // 生成的用户信息在ctx.state上

router.post('/list', auth, find)
router.post('/detail', auth, detail)
router.post('/update', auth, update)
router.post('/delete', auth, del)
router.post('/upload', auth, upload)

module.exports = router
