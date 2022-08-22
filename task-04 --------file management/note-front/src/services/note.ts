import request from '../libs/request'
import { ApiResp } from '../libs/models'
import { AxiosRequestHeaders } from 'axios'

interface Note {
  title: string
  note: string
}
export async function getNote(_id: string, cookie?: any) {
  let headers: AxiosRequestHeaders | undefined = undefined
  if (cookie) {
    headers = {
      cookie,
    }
  }
  const query = new URLSearchParams({
    _id: _id,
  })

  const { data } = await request.get<ApiResp<{ note: Note }>>(
    '/api/v1/file/show?' + query.toString(),
    { headers }
  )
  return data
}
