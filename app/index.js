const Koa = require('koa')
const app = new Koa()
// const json = require('koa-json')
// const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const routing = require('./routes')
const cors = require('koa2-cors')
const koaStatic = require('koa-static')
const error = require('koa-json-error')
const koaBody = require('koa-body')
const parameter = require('koa-parameter')
const path = require('path')

// 解决跨域
app.use(cors())

// 指定静态文件目录中间件
app.use(koaStatic(path.join(__dirname, 'public')))

// 错误处理
app.use(
  error({
    postFormat: (err, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest },
  })
)

app.use(
  koaBody({
    multipart: true, // 表示启用文件，可以上传文件
    formidable: {
      uploadDir: path.join(__dirname, '/public/uploads'), // 上传目录
      keepExtensions: true, // 保留扩展名
    },
  })
)

// app.use(
//   bodyparser({
//     enableTypes: ['json', 'form', 'text'],
//   })
// )
// app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(parameter(app))
routing(app)

app.listen(3003, () => {
  console.log('程序启动在3003端口了')
})
