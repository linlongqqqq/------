import { useState, useCallback, useMemo } from 'react'
import { IFile } from '../libs/models'
import * as RecentFileService from '../services/recentFile'

// 此处需要传入初始值用于服务端渲染
export default function useSongs(initFiles: IFile[], initTotal: number) {
  const [loading, setLoading] = useState(false)
  const [skip, setSkip] = useState(initFiles.length)
  const [total, setTotal] = useState(initTotal)
  const [recentFiles, setRecentFiles] = useState<IFile[]>(initFiles)
  const [error, setError] = useState('')

  const hasMore = useMemo(() => {
    return skip < total
  }, [skip, total])

  const listRecentFiles = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { code, message, data } = await RecentFileService.listRecentFile()
      if (code === 0) {
        setRecentFiles(data.files)
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
      const { code, message, data } = await RecentFileService.listRecentFile({
        skip,
      })
      if (code === 0) {
        setRecentFiles(recentFiles.concat(data.files))
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
  }, [skip, recentFiles])

  return {
    recentFiles,
    hasMore,
    loading,
    error,
    listRecentFiles,
    loadMore,
  }
}
