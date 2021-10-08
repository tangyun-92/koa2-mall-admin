/*
 * @Author: 唐云 
 * @Date: 2021-10-08 09:26:30 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-08 13:21:54
 * 用户路由
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/ums/admins' })
const jwt = require('koa-jwt')

const {
  find,
  update,
  login,
  changeStatus,
  delete: del,
  updatePassword
} = require('../controllers/ums-admins')

const { secret } = require('../config/jwt')

/**
 * 认证中间件
 */
const auth = jwt({ secret }) // 生成的用户信息在ctx.state上

router.post('/list', auth, find)
router.post('/update', auth, update)
router.post('/changeStatus', auth, changeStatus)
router.post('/password', auth, updatePassword)
router.post('/delete', auth, del)
router.post('/login', login)

module.exports = router
