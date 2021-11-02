const Koa = require('koa')
const app = new Koa()
const logger = require('koa-logger')
const routing = require('./routes')
const cors = require('koa2-cors')
const koaStatic = require('koa-static')
const error = require('koa-json-error')
const koaBody = require('koa-body')
const parameter = require('koa-parameter')
const path = require('path')
const jwt = require('jsonwebtoken')
const { secret } = require('./config/jwt')
const UmsAdminLoginLog = require('./models/ums-admin-login-log')
const logsUtil = require('./utils/logs')
const { formData } = require('./utils')

// 解决跨域
app.use(cors())

// 指定静态文件目录中间件
app.use(koaStatic(path.join(__dirname, 'public')))

app.use(
  koaBody({
    multipart: true, // 表示启用文件，可以上传文件
    formidable: {
      // uploadDir: path.join(__dirname, '/public/uploads'), // 上传目录
      keepExtensions: true, // 保留扩展名
    },
  })
)

app.use(logger())

// logger
app.use(async (ctx, next) => {
  const token = ctx.request.header.authorization
  const result = jwt.verify(token.split(' ')[1], secret, { expiresIn: '1d' })
  const time = Date.now()
  UmsAdminLoginLog.create({
    username: result.username,
    admin_id: result.id,
    create_time: formData(time),
    ip: ctx.request.header.host,
    address: ctx.request.url
  })

  const start = new Date()
  let intervals
  try {
    await next()
    intervals = new Date() - start
    logsUtil.logResponse(ctx, intervals) // 记录响应日志
  } catch (error) {
    intervals = new Date() - start
    logsUtil.logError(ctx, error, intervals) // 记录异常日志
  }
})

// 错误处理
app.use(
  error({
    postFormat: (err, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest, result: false },
  })
)


app.use(parameter(app))
routing(app)

app.listen(3003, () => {
  console.log('程序启动在3003端口了')
})
