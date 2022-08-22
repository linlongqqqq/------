import { useState, useCallback, useMemo } from 'react'
import { Share } from '../libs/models'
import * as shareService from '../services/share'

// 此处需要传入初始值用于服务端渲染
export default function useSongs(initFiles: Share[], initTotal: number) {
  const [loading, setLoading] = useState(false)
  const [skip, setSkip] = useState(initFiles.length)
  const [total, setTotal] = useState(initTotal)
  const [sharedFiles, setSharedFiles] = useState<Share[]>(initFiles)
  const [error, setError] = useState('')

  const hasMore = useMemo(() => {
    return skip < total
  }, [skip, total])

  const listShares = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { code, message, data } = await shareService.listShare()
      if (code === 0) {
        setSharedFiles(data.files)
        setSkip(data.files.length)
        setTotal(data.total)
      } else {
        setError(message)
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadMore = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { code, message, data } = await shareService.listShare({
        skip,
      })
      if (code === 0) {
        setSharedFiles(sharedFiles.concat(data.files))
        setSkip(skip + data.files.length)
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
  }, [skip, sharedFiles])

  return {
    sharedFiles,
    hasMore,
    loading,
    error,
    listShares,
    loadMore,
  }
}
