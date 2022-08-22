import request from '../libs/request'
import { ApiResp } from '../libs/models'
import { AxiosRequestHeaders } from 'axios'

interface Show {
  note: string
  viewed: number
  title: string
}
export async function getShow(url: string, cookie?: any) {
  let headers: AxiosRequestHeaders | undefined = undefined
  if (cookie) {
    headers = {
      cookie,
    }
  }
  const query = new URLSearchParams({
    url: url,
  })

  const { data } = await request.get<ApiResp<{ show: Show }>>(
    'api/v1/share/show?' + query.toString(),
    { headers }
  )
  return data
}
