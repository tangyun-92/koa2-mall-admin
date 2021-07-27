/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:48:41 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-27 15:14:48
 * 用户路由
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const jwt = require('koa-jwt')

const { find, login, create, update, delete: del, changeStatus } = require('../controllers/users')

const { secret } = require('../config/jwt')

/**
 * 认证中间件
 */
const auth = jwt({ secret }) // 生成的用户信息在ctx.state上

router.post('/list', auth, find)
router.post('/login', login)
router.post('/create', auth, create)
router.post('/update', auth, update)
router.post('/delete', auth, del)
router.post('/status', auth, changeStatus)

module.exports = router
