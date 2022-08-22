import 'dotenv/config'
import Koa from 'koa'
import KoaBody from 'koa-body'
import task from './controllers/task'
import user from './controllers/user'
import logger from './middlewares/logger'
import checkError from './middlewares/checkError'
import checkLogin from './middlewares/checkLogin'
import * as db from './db'

const app = new Koa({
  keys: JSON.parse(process.env.KEYS),
})
app.use(logger)
app.use(checkError)
app.use(KoaBody())
app.use(checkLogin)
app.use(user)
app.use(task)

async function run() {
  // 先等待数据库连接
  await db.init()
  // 监听端口
  app.listen(process.env.PORT)
}

run()
