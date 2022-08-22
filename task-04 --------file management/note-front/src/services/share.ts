import request from '../libs/request'
import { ApiResp, Share } from '../libs/models'
import { AxiosRequestHeaders } from 'axios'

export async function listShare(
  params: {
    skip?: number
    limit?: number
  } = {},
  cookie?: any
) {
  let headers: AxiosRequestHeaders | undefined = undefined
  if (cookie) {
    headers = {
      cookie,
    }
  }
  const query = new URLSearchParams({
    skip: (params.skip || 0).toString(),
    limit: (params.limit || 10).toString(),
  })
  const { data } = await request.get<
    ApiResp<{ files: Share[]; total: number }>
  >('/api/v1/share/lists?' + query.toString(), { headers })
  return data
}
