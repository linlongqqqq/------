import { useState, useCallback, useMemo, useContext } from 'react'
import { IFile } from '../libs/models'
import * as fileService from '../services/file'
// 此处需要传入初始值用于服务端渲染
export default function useFiles(initFiles: IFile[], initTotal: number) {
  const [loading, setLoading] = useState(false)
  const [skip, setSkip] = useState(initFiles.length)
  const [total, setTotal] = useState(initTotal)
  const [files, setFiles] = useState<IFile[]>(initFiles)
  const [error, setError] = useState('')

  const hasMore = useMemo(() => {
    console.log(total, skip)
    return skip < total
  }, [skip, total])

  const listFiles = useCallback(async (id?: string) => {
    try {
      setLoading(true)
      setError('')
      const { code, message, data } = await fileService.listfiles({ pid: id })
      if (code === 0) {
        setFiles(data.files)
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
      const { code, message, data } = await fileService.listfiles({
        skip,
      })
      if (code === 0) {
        setFiles(files.concat(data.files))
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
  }, [skip, files])

  return {
    files,
    hasMore,
    loading,
    error,
    listFiles,
    loadMore,
  }
}
