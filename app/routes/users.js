/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:48:41 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-11-02 14:28:02
 * 用户路由
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const jwt = require('koa-jwt')

const {
  find,
  login,
  update,
  delete: del,
  changeStatus,
  updatePassword,
} = require('../controllers/users')

const { secret } = require('../config/jwt')

/**
 * 认证中间件
 */
const auth = jwt({ secret }) // 生成的用户信息在ctx.state上

router.post('/list', auth, find)
router.post('/login', login)
router.post('/update', auth, update)
router.post('/delete', auth, del)
router.post('/status', auth, changeStatus)
router.post('/password', auth, updatePassword)

module.exports = router
