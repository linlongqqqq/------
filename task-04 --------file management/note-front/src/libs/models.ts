export interface ApiResp<T = any> {
  code: number
  message: string
  data: T
}

export enum SongStatus {
  Normal = 1,
  Disabled = 2,
}

export interface ISinger {
  _id: string
  name: string
  birthday: string
  pic: string
}

export interface ISession {
  name: string
  createdAt: number
}
// 文件
export interface IFile {
  // id
  _id: string
  // 父id
  pid?: string
  // 标题
  title: string
  // 是否是文件夹
  isFolder: boolean
  // 笔记
  note?: string
  //用户id
  userId: string
  // 创建时间
  createdAt: Date
}
// 用户
export interface IUser {
  _id?: string
  // 账号
  account: string
  // 昵称
  nickname: string
  // 加密之后的密码
  password: string
  // 密码加密的盐
  salt: string
  // 创建时间
  createdAt: Date
}
export interface Share {
  _id: string
  noteId: string
  url: string
  viewed: string
  userId: string
  title: string
  createdAt: Date
}
