import { ObjectId } from 'mongodb'
import { IUser, UserStatus } from '../models/types'
import * as db from '../db'
import { stats } from '../libs/stats'
import { sessionCreate, sessiondel } from './sessions'
import crypto from 'crypto'

interface Login {
  account: string
  password: string
}
interface repass {
  oldpassword: string
  newpassword: string
  createdAt: number
}
// 生成盐
const genRandomString = function () {
  return crypto
    .randomBytes(Math.ceil(10 / 2))
    .toString('hex') /**转成十六进制*/
    .slice(0, 10) /**返回指定长度字符串*/
}
// 进行加密
const sha512 = function (password: string, salt: string) {
  let hash = crypto.createHmac('sha512', salt) /**使用sha512算法进行hash*/
  hash.update(password)
  let value = hash.digest('hex')
  return {
    salt: salt,
    passwordHash: value,
  }
}

//创建用户
export async function create(user: IUser) {
  user.createdAt = new Date()
  const account = user.account
  const salt = genRandomString() //生成盐
  const passwordData = sha512(user.password, salt)
  user.salt = passwordData.salt
  user.password = passwordData.passwordHash
  const user_account = await db.users.findOne({
    account: account,
  })
  if (!user_account) {
    const result = await db.users.insertOne(user)
    return result.insertedId
  } else throw stats.ErrRepeatUser
}
// 获取用户信息
export async function getUser(userId: ObjectId) {
  const user_account = await db.users.findOne({
    _id: userId,
  })
  return user_account
}

// 登录
export async function login(user: Login, ip: string) {
  const username = user.account
  const password = user.password
  const user_account = await db.users.findOne({
    account: username,
  })
  if (!user_account) throw stats.ErrUserNotFound
  const passwordData = sha512(password, user_account.salt)
  if (user_account.password === passwordData.passwordHash) {
    // sessiondel(user_account._id)
    const sessionId = sessionCreate(ip, user_account._id)
    return sessionId
  } else throw stats.ErrPassword
}
// 修改密码
export async function repass(user: repass, session_sid: string) {
  console.log(session_sid)
  const session = await db.sessions.findOne({
    sid: session_sid,
  })
  const user_id = session.userId
  const obj: { [key: string]: any } = {}
  obj.createdAt = new Date()
  const oldPass = user.oldpassword
  const user_information = await db.users.findOne({
    _id: user_id,
  })
  if (!user_information) throw stats.ErrUserNotFound
  sessiondel(user_information._id)
  const passwordData = sha512(oldPass, user_information.salt)
  if (user_information.password === passwordData.passwordHash) {
    const salt = genRandomString() //生成盐
    const passwordData = sha512(user.newpassword, salt)
    obj.password = passwordData.passwordHash
    obj.salt = passwordData.salt
    await db.users.updateOne(
      {
        _id: user_information._id,
      },
      {
        $set: obj,
      }
    )
  }
}
// 退出登录
export async function layout(user: IUser) {
  console.log(user._id)
  sessiondel(user._id)
}
