/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:48:41 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-25 15:08:40
 * 优选主题路由
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/cms/preferences' })
const jwt = require('koa-jwt')

const {
  find,
  findMap,
  update,
  delete: del,
  upload,
} = require('../controllers/cms-preferences')

const { secret } = require('../config/jwt')

/**
 * 认证中间件
 */
const auth = jwt({ secret }) // 生成的用户信息在ctx.state上

router.post('/list', auth, find)
router.post('/listMap', auth, findMap)
router.post('/update', auth, update)
router.post('/delete', auth, del)
router.post('/upload', upload)

module.exports = router
