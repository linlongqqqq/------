import { sessions } from './../db'
import { ObjectId, Filter } from 'mongodb'

import { ITask, UserStatus } from '../models/types'
import * as db from '../db'
import { stats } from '../libs/stats'

interface ListFilter {
  finished?: boolean
  important?: boolean
  userId: ObjectId
}

/**
 * 查询任务列表
 * @param filter
 * @param skip
 * @param limit
 * @returns
 */
export async function list(
  filter: ListFilter = {
    userId: new ObjectId(),
  },
  skip = 0,
  limit = 10
) {
  const match: Filter<ITask> = {
    userId: filter.userId,
  }
  if (filter.finished !== undefined) match.finished = filter.finished
  if (filter.important !== undefined) match.important = filter.important
  const items = await db.tasks
    .aggregate([
      {
        $match: match,
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ])
    .toArray()

  const total = await db.tasks.countDocuments(match)
  console.log(items)
  return {
    items,
    total,
  }
}

/**
 * 创建任务
 * @param record
 * @returns
 */
export async function create(record: ITask, sid: string) {
  const session = await db.sessions.findOne({
    sid: sid,
  })
  const user_id = session.userId
  record.userId = user_id
  record.createdAt = new Date()
  const result = await db.tasks.insertOne(record)
  return result.insertedId
}

/**
 * 删除任务
 * @param _id
 */
export async function remove(_id: string) {
  const result = await db.tasks.findOneAndDelete({
    _id: new ObjectId(_id),
  })
  if (!result.value) throw stats.ErrTaskNotFound
}

/**
 * 更新任务
 * @param _id
 * @param record
 */

export async function update(_id: string, fin: boolean, impor: boolean) {
  const taskId = new ObjectId(_id)
  const task = await db.tasks.findOne({
    _id: taskId,
  })
  if (!task) throw stats.ErrTaskNotFound
  const obj: { [key: string]: any } = {}
  if (fin !== undefined) {
    obj.finished = fin
  }
  if (impor !== undefined) {
    obj.important = impor
  }
  obj.createdAt = new Date()
  await db.tasks.updateOne(
    {
      _id: taskId,
    },
    {
      $set: obj,
    }
  )
}
