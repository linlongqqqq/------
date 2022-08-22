import { stats } from '../libs/stats'
import * as db from '../db'
import { Middleware } from 'koa'
import { UserStatus } from '../models/types'

const canVisit = ['/api/v1/user/create', '/api/v1/user/login'] // 白名单

const checkLogin: Middleware = async (ctx, next) => {
  const sid = ctx.cookies.get('session_id')
  const session = await db.sessions.findOne({
    sid: sid,
  })
  if (session) {
    const user = await db.users.findOne({
      _id: session.userId,
    })
    if (user) {
      if (user.status === UserStatus.Disabled) throw stats.ErrUserIsDisable
      ctx.state.user = user
      await next()
      return
    }
  }
  if (!canVisit.includes(ctx.url)) {
    throw stats.ErrUserNotLogin
  }
  await next()
}
export default checkLogin
