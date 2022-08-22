export interface IAlbum {
  _id: string
  context: string
  finished: boolean
  important: boolean
}
export interface ApiResp<T = any> {
  code: number
  message: string
  data: T
}
export interface User {
  _id: string
  account: string
  nickname: string
  password: string
  salt: string
  createdAt: number
}
