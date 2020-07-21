require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')

const api = require('./api')
// const createFakeData = require('./createFakeData')

// 데이터베이스 연결
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to MongoDB')
    // createFakeData()
  })
  .catch((err) => {
    console.error(err)
  })

const app = new Koa()
const router = new Router()

// 라우터 설정
router.use('/api', api.routes())

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser())

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods())

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})
