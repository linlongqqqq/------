import axios from 'axios'
import { ApiResp, IAlbum } from '../libs/module'

interface Data {
  items: IAlbum[]
  total: number
}
export async function getTask(
  params: {
    skip?: number
    limit?: number
    finished?: boolean
    important?: boolean
  } = {}
) {
  const query = new URLSearchParams({
    skip: (params.skip || 0).toString(),
    limit: (params.limit || 10).toString(),
  })
  const finished = String(params.finished)
  const important = String(params.important)

  if (params.finished !== undefined) {
    query.append('finished', finished)
  }
  if (params.important !== undefined) {
    query.append('important', important)
  }
  const { data } = await axios.get<ApiResp<Data>>('/api/v1/task/lists?' + query.toString())
  return data
}

export async function getUser() {
  const user_sesson = await axios.get<ApiResp>('/api/v1/user/getUser')
  const information = user_sesson.data.data
  return information
}
