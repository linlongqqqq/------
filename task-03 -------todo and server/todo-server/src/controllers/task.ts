import { users } from './../db'
import Joi from 'joi'
import Router from 'koa-router'

import validate from '../libs/validate'
import { JsonResp } from '../libs/stats'
import * as taskService from '../services/task'

const router = new Router({
  prefix: '/api/v1/task',
})

//任务列表
router.get('/lists', async (ctx) => {
  const value = validate(
    ctx.query,
    Joi.object({
      finished: Joi.bool(),
      important: Joi.bool(),
      skip: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).max(20).default(10),
    })
  )
  value.userId = ctx.state.user._id
  const result = await taskService.list(value)
  ctx.body = new JsonResp(result)
})
// 添加任务
router.post('/create', async (ctx) => {
  const value = validate(
    ctx.request.body,
    Joi.object({
      context: Joi.string().max(100).required(),
      createdAt: Date.now(),
      finished: Joi.boolean().default(false),
      important: Joi.boolean().default(false),
    })
  )
  const _id = await taskService.create(value, ctx.cookies.get('session_id'))
  ctx.body = new JsonResp({
    _id,
  })
})

// 删除任务
router.post('/remove', async (ctx) => {
  const { _id } = validate(
    ctx.request.body,
    Joi.object({
      _id: Joi.string().required(),
    })
  )
  await taskService.remove(_id)
  ctx.body = new JsonResp()
})

// 更新任务
router.post('/update', async (ctx) => {
  const { _id, finished, important } = validate(
    ctx.request.body,
    Joi.object({
      _id: Joi.string().required(),
      finished: Joi.boolean(),
      important: Joi.boolean(),
    })
  )
  await taskService.update(_id, finished, important)

  ctx.body = new JsonResp()
})

export default router.routes()
