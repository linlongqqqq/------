import { useCallback, useContext } from 'react'
import { context } from './store'

export default function useFinish() {
  const { list, setList } = useContext(context)

  // 添加完成
  const addLike = useCallback(
    (id: string) => {
      const listNew = list.map((item) => {
        if (item.id === id) {
          return { ...item, isLike: true }
        } else {
          return item
        }
      })
      setList(listNew)
    },
    [list, setList]
  )

  // 取消完成
  const delLike = useCallback(
    (id: string) => {
      const listNew = list.map((item) => {
        if (item.id === id) {
          return { ...item, isLike: false }
        } else {
          return item
        }
      })
      setList(listNew)
    },
    [list, setList]
  )
  return {
    list,
    addLike,
    delLike,
  }
}
