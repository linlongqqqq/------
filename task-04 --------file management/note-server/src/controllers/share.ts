import { users } from '../db'
import Joi, { bool } from 'joi'
import Router from 'koa-router'
import validate from '../libs/validate'
import { JsonResp } from '../libs/stats'
import * as taskService from '../services/file'
import * as shareService from '../services/share'

const router = new Router({
  prefix: '/api/v1/share',
})
// 创建分享
router.post('/create', async (ctx) => {
  const value = validate(
    ctx.request.body,
    Joi.object({
      _id: Joi.string().required(),
    })
  )
  const userId = ctx.state.user._id
  const result = await shareService.create(value, userId)
  ctx.body = new JsonResp(result)
})

// 删除分享
router.post('/remove', async (ctx) => {
  const { url } = validate(
    ctx.request.body,
    Joi.object({
      url: Joi.string().required(),
    })
  )
  await shareService.remove(url)
  ctx.body = new JsonResp()
})

router.post('/removenote', async (ctx) => {
  const { noteId } = validate(
    ctx.request.body,
    Joi.object({
      noteId: Joi.string().required(),
    })
  )
  await shareService.removeNote(noteId)
  ctx.body = new JsonResp()
})
//显示列表
router.get('/lists', async (ctx) => {
  const { skip, limit } = validate(
    ctx.query,
    Joi.object({
      skip: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).max(20).default(10),
    })
  )
  const userId = ctx.state.user._id
  const result = await shareService.list(userId, skip, limit)
  ctx.body = new JsonResp(result)
})

// 查看内容
router.get('/show', async (ctx) => {
  const { url } = validate(
    ctx.query,
    Joi.object({
      url: Joi.string().required(),
    })
  )
  const result = await shareService.show(url)
  ctx.body = new JsonResp(result)
})

export default router.routes()
