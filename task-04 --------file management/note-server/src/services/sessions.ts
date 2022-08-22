import { ObjectId } from 'mongodb'
import * as crypto from 'crypto'
import { ISession } from '../models/types'
import * as db from '../db'

// 写入session
export async function sessionCreate(ip: string, useId: ObjectId) {
  const record: ISession = {
    sid: crypto.randomBytes(12).toString('hex'),
    userId: useId,
    createdAt: new Date(),
    ip: ip,
  }
  const result = await db.sessions.insertOne(record)
  return record.sid
}

// 删除session
export async function sessiondel(useId: ObjectId) {
  const result = await db.sessions.findOneAndDelete({
    userId: useId,
  })
}
