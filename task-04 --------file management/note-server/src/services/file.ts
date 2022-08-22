import { ObjectId, Filter } from 'mongodb'
import { IFile } from '../models/types'
import * as db from '../db'
import { stats } from '../libs/stats'

interface Updata {
  _id: string
  title?: string
  note?: string
}

/**
 * 查询任务列表
 * @param filter
 * @param skip
 * @param limit
 * @returns
 */
export async function list(userId: string, pid: string, skip = 0, limit = 10) {
  const match: Filter<IFile> = {
    userId: new ObjectId(userId),
    pid,
  }
  const files = await db.files
    .aggregate([
      {
        $match: match,
      },
      {
        $sort: { isFolder: -1, name: 1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ])
    .toArray()
  const total = await db.files.countDocuments(match)
  return { files, total }
}
// 查询最近
export async function recent(userId: string, skip = 0, limit = 10) {
  const match: Filter<IFile> = {
    userId: new ObjectId(userId),
    isFolder: false,
  }
  const files = await db.files
    .aggregate([
      {
        $match: match,
      },
      {
        $sort: { createdAt: -1, name: 1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ])
    .toArray()
  const total = await db.files.countDocuments(match)
  return { files, total }
}

/**
 * 创建任务
 * @param record
 * @returns
 */
export async function create(record: IFile, sid: string) {
  const session = await db.sessions.findOne({
    sid: sid,
  })
  const user_id = session.userId
  record.userId = user_id
  record.createdAt = new Date()
  const result = await db.files.insertOne(record)
  return result.insertedId
}

/**
 * 删除任务
 * @param _id
 */

export async function remove(_id: string) {
  const child = await db.files.findOne({
    pid: _id,
  })

  if (!child) {
    const result = await db.files.findOneAndDelete({
      _id: new ObjectId(_id),
    })
    if (!result.value) throw stats.ErrTaskNotFound
  } else throw stats.ErrfolderIsnotEmpty
}

/**
 * 更新任务
 * @param _id
 * @param record
 */

export async function update(record: Updata) {
  const fileId = new ObjectId(record._id)
  const file = await db.files.findOne({
    _id: fileId,
  })
  if (!file) throw stats.ErrTaskNotFound
  console.log(record.note)

  const obj: { [key: string]: any } = {}
  if (record.title !== undefined) {
    obj.title = record.title
  }
  if (record.note !== undefined) {
    obj.note = record.note
  }
  obj.createdAt = new Date()
  await db.files.updateOne(
    {
      _id: fileId,
    },
    {
      $set: obj,
    }
  )
}
// 展示内容
export async function show(userId: ObjectId, id: string) {
  const file = await db.files.findOne({
    _id: new ObjectId(id),
  })
  if (!file) throw stats.ErrTaskNotFound

  // if (file.userId !== userId) {
  //   throw stats.ErrUserNotLogin
  // }
  const obj = {
    note: file.note,
    title: file.title,
  }
  return obj
}
