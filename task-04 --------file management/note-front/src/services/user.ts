import request from '../libs/request'
import { ApiResp, IUser } from '../libs/models'
import { AxiosRequestHeaders } from 'axios'

export async function getUser(cookie?: any) {
  let headers: AxiosRequestHeaders | undefined = undefined
  if (cookie) {
    headers = {
      cookie,
    }
  }
  const { data } = await request.get<ApiResp<{ user: IUser }>>(
    '/api/v1/user/getUser',
    { headers }
  )
  return data
}
