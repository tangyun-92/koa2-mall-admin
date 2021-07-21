const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const { find } = require('../controllers/user')

router.get('/', find)

module.exports = router
