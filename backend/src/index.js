require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const serve = require('koa-static')
const path = require('path')
const send = require('koa-send')

const api = require('./api')
const jwtMiddleware = require('./lib/jwtMiddleware')

// 데이터베이스 연결
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error(err)
  })

const app = new Koa()
const router = new Router()

// 라우터 설정
router.use('/api', api.routes())

// middleware
app.use(bodyParser())
app.use(jwtMiddleware)

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods())

const buildDirectory = path.resolve(__dirname, '../../frontend/build')
app.use(serve(buildDirectory))
app.use(async (ctx) => {
  // Not Found이고, 주소가 /api로 시작하지 않는 경우
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    // index.html 내용을 반환
    await send(ctx, 'index.html', { root: buildDirectory })
  }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})
