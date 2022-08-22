import { users } from '../db'
import Joi, { bool } from 'joi'
import Router from 'koa-router'
import validate from '../libs/validate'
import { JsonResp } from '../libs/stats'
import * as taskService from '../services/file'

const router = new Router({
  prefix: '/api/v1/file',
})

//任务列表
router.get('/lists', async (ctx) => {
  const { pid, skip, limit } = validate(
    ctx.query,
    Joi.object({
      pid: Joi.string(),
      skip: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).max(20).default(10),
    })
  )
  const userId = ctx.state.user._id
  const result = await taskService.list(userId, pid, skip, limit)
  ctx.body = new JsonResp(result)
})
//最近任务列表
router.get('/recent', async (ctx) => {
  const { skip, limit } = validate(
    ctx.query,
    Joi.object({
      skip: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).max(20).default(10),
    })
  )
  const userId = ctx.state.user._id
  const result = await taskService.recent(userId, skip, limit)
  ctx.body = new JsonResp(result)
})
// 添加任务
router.post('/create', async (ctx) => {
  const value = validate(
    ctx.request.body,
    Joi.object({
      isFolder: Joi.bool().required(),
      pid: Joi.string(),
      title: Joi.string().max(20).required(),
      note: Joi.string(),
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
  const value = validate(
    ctx.request.body,
    Joi.object({
      _id: Joi.string().required(),
      title: Joi.string().max(20),
      note: Joi.string(),
    })
  )
  const _id = await taskService.update(value)
  ctx.body = new JsonResp({
    _id,
  })
})

// 展示内容
router.get('/show', async (ctx) => {
  const { _id } = validate(
    ctx.query,
    Joi.object({
      _id: Joi.string().required(),
    })
  )
  const userId = ctx.state.user._id
  const result = await taskService.show(userId, _id)
  ctx.body = new JsonResp(result)
})

export default router.routes()
