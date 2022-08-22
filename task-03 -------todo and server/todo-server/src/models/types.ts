import { ObjectId } from 'mongodb'

// 用户状态
export enum UserStatus {
  // 正常
  Normal = 1,
  // 被禁用
  Disabled = 2,
}

// 用户
export interface IUser {
  _id?: ObjectId
  // 账号
  account: string
  // 昵称
  nickname: string
  // 加密之后的密码
  password: string
  // 密码加密的盐
  salt: string
  // 用户状态
  status: UserStatus
  // 创建时间
  createdAt: Date
}
// 会话
export interface ISession {
  // session id
  sid: string
  // 关联的用户_id
  userId: ObjectId
  // 登录的ip地址
  ip: string
  // 创建时间
  createdAt: Date
}
// 任务
export interface ITask {
  // 内容
  content: string
  // 是否完成
  finished: boolean
  // 是否重要
  important: boolean
  // 用户的_id
  userId: ObjectId
  // 创建时间
  createdAt: Date
}
