import Joi from 'joi'
import Router from 'koa-router'
import validate from '../libs/validate'
import { JsonResp } from '../libs/stats'
import * as userService from '../services/user'

const router = new Router({
  prefix: '/api/v1/user',
})

// 创建用户
router.post('/create', async (ctx) => {
  const value = validate(
    ctx.request.body,
    Joi.object({
      account: Joi.string().max(20).required(),
      nickname: Joi.string().max(20).required(),
      password: Joi.string().max(20).required(),
      createdAt: new Date(),
    })
  )
  const _id = await userService.create(value)
  ctx.body = new JsonResp({
    _id,
  })
})
// 获取用户信息
router.get('/getUser', async (ctx) => {
  const userId = ctx.state.user._id
  const result = await userService.getUser(userId)
  ctx.body = new JsonResp(result)
})

// 用户登录
router.post('/login', async (ctx) => {
  const value = validate(
    ctx.request.body,
    Joi.object({
      account: Joi.string().max(20).required(),
      password: Joi.string().max(20).required(),
    })
  )
  const result = await userService.login(value, ctx.request.ip)
  ctx.cookies.set('session_id', result, {
    signed: true,
    expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
  })
  ctx.body = new JsonResp(result)
})

//修改密码
router.post('/repass', async (ctx) => {
  const value = validate(
    ctx.request.body,
    Joi.object({
      oldpassword: Joi.string().max(20).required(),
      newpassword: Joi.string().max(20).required(),
    })
  )
  const result = await userService.repass(value, ctx.cookies.get('session_id'))
  ctx.body = new JsonResp(result)
})
// 退出登录
router.get('/layout', async (ctx) => {
  const result = await userService.layout(ctx.state.user)
  ctx.body = new JsonResp(result) // 可以返回正确的信息
})

export default router.routes()
