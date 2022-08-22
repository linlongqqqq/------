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
  // status: UserStatus
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

// 文件
export interface IFile {
  _id?: ObjectId
  // 父id
  pid: string
  // 标题
  title: string
  // 是否是文件夹
  isFolder: boolean
  // 用户的_id
  userId: ObjectId
  // 笔记
  note?: string
  // 创建时间
  createdAt: Date
}

export interface Ishare {
  // 浏览次数
  userId: ObjectId
  url: string
  viewed: number
  noteId: ObjectId
  createdAt: Date
}
