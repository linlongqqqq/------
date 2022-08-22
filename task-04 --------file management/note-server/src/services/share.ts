import { Ishare } from './../models/types'
import { ObjectId, Filter } from 'mongodb'
import { IFile } from '../models/types'
import * as db from '../db'
import { stats } from '../libs/stats'
import crypto from 'crypto'

interface props {
  _id: string
}
const genRandomString = function () {
  return crypto
    .randomBytes(Math.ceil(6 / 2))
    .toString('hex') /**转成十六进制*/
    .slice(0, 6) /**返回指定长度字符串*/
}
// 创建分享
export async function create(value: props, userId: ObjectId) {
  const id = new ObjectId(value._id)
  const file = await db.files.findOne({
    _id: id,
  })
  if (!file) throw stats.ErrTaskNotFound
  const share = await db.shares.findOne({
    noteId: id,
  })
  if (share) {
    return share.url
  }
  if (file.isFolder === true) throw stats.ErrShareNotFolder
  const url = genRandomString()
  const obj: Ishare = {
    noteId: file._id,
    createdAt: new Date(),
    url: url,
    viewed: 0,
    userId: userId,
  }
  await db.shares.insertOne(obj)
  return url
}

// 删除分享
export async function remove(url: string) {
  const result = await db.shares.findOneAndDelete({
    url: url,
  })
  if (!result.value) throw stats.ErrShareNotFound
}
// 通过nodeId删除分享
export async function removeNote(noteId: string) {
  const result = await db.shares.findOneAndDelete({
    noteId: new ObjectId(noteId),
  })
  if (!result.value) throw stats.ErrShareNotFound
}

// 获取列表
export async function list(userId: string, skip = 0, limit = 10) {
  const match: Filter<IFile> = {
    userId: new ObjectId(userId),
  }
  const files = await db.shares
    .aggregate([
      {
        $match: match,
      },
      {
        $lookup: {
          from: 'files',
          localField: 'noteId',
          foreignField: '_id',
          as: '_files',
        },
      },
      {
        $unwind: {
          path: '$_files',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          noteId: '$_files._id',
          title: '$_files.title',
        },
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
      {
        $project: {
          userId: 1,
          createdAt: 1,
          title: 1,
          noteId: 1,
        },
      },
    ])
    .toArray()
  const total = await db.shares.countDocuments()
  return { files, total }
}

// 查看详情
export async function show(url: string) {
  const share = await db.shares.findOne({
    url: url,
  })
  const file = await db.files.findOne({
    _id: share.noteId,
  })
  const note = file.note
  const viewed = share.viewed + 1
  await db.shares.updateOne(
    {
      _id: share._id,
    },
    {
      $set: { viewed: viewed },
    }
  )
  if (!file) throw stats.ErrTaskNotFound
  const obj = {
    note: note,
    viewed: viewed,
    title: file.title,
  }
  return obj
}
