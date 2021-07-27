/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:48:41 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-27 10:20:30
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

router.get('/', auth, find)
router.post('/login', login)
router.post('/', auth, create)
router.patch('/:id', auth, update)
router.delete('/:id', auth, del)
router.patch('/:id/status', auth, changeStatus)

module.exports = router
