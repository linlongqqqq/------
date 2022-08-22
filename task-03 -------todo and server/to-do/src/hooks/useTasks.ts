import { useState, useCallback, useMemo, useContext } from 'react'
import { IAlbum } from '../libs/module'
import * as taskService from '../service/task'
import { context } from './store'

export default function useTask() {
  const [loading, setLoading] = useState(false)
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState<IAlbum[]>([])
  const [error, setError] = useState('')
  let impor: boolean | undefined
  let finish: boolean | undefined
  const { type } = useContext(context)
  const hasMore = useMemo(() => {
    return skip < total
  }, [skip, total])

  const listTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      if (type === 1) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        finish = false
        // eslint-disable-next-line react-hooks/exhaustive-deps
        impor = undefined
      }
      if (type === 2) {
        finish = undefined
        impor = true
      }
      if (type === 3) {
        finish = true
        impor = undefined
      }

      const { code, message, data } = await taskService.getTask({ finished: finish, important: impor })
      if (code === 0) {
        setList(data.items)
        setSkip(data.items.length)
        setTotal(data.total)
      } else {
        setError(message)
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [type, finish, impor])

  const loadMore = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { code, message, data } = await taskService.getTask({
        skip,
      })
      if (code === 0) {
        setList(list.concat(data.items))
        setSkip(skip + data.items.length)
        setTotal(data.total)
      } else {
        setError(message)
      }
    } catch (error: any) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }, [skip, list])

  return {
    total,
    list,
    hasMore,
    loading,
    error,
    listTasks,
    loadMore,
  }
}
