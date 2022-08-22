import request from '../libs/request'
import { ApiResp, IFile } from '../libs/models'
import { AxiosRequestHeaders } from 'axios'

export async function listfiles(
  params: {
    pid?: string
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
  if (params.pid && params.pid !== undefined) query.append('pid', params.pid)
  const { data } = await request.get<
    ApiResp<{ files: IFile[]; total: number }>
  >('/api/v1/file/lists?' + query.toString(), { headers })
  return data
}
