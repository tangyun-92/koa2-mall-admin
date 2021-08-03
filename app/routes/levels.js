/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:48:41 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-03 17:06:22
 * 会员等级
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/levels' })
const jwt = require('koa-jwt')

const {
  find,
  update,
  delete: del,
} = require('../controllers/levels')

const { secret } = require('../config/jwt')

/**
 * 认证中间件
 */
const auth = jwt({ secret }) // 生成的用户信息在ctx.state上

router.post('/list', auth, find)
router.post('/update', auth, update)
router.post('/delete', auth, del)

module.exports = router
