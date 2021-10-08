/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:48:41 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-08 16:00:26
 * 品牌路由
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/pms/brands' })
const jwt = require('koa-jwt')

const {
  find,
  update,
  delete: del,
  upload
} = require('../controllers/pms-brands')

const { secret } = require('../config/jwt')

/**
 * 认证中间件
 */
const auth = jwt({ secret }) // 生成的用户信息在ctx.state上

router.post('/list', auth, find)
router.post('/update', auth, update)
router.post('/delete', auth, del)
router.post('/upload', upload)

module.exports = router
