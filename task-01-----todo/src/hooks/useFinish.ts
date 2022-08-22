import { useCallback, useContext } from 'react'
import { context } from './store'

export default function useFinish() {
  const { list, setList } = useContext(context)

  // 添加完成
  const addFinish = useCallback(
    (id: string) => {
      const listNew = list.map((item) => {
        if (item.id === id) {
          return { ...item, isFinish: true }
        } else {
          return item
        }
      })
      setList(listNew)
    },
    [list, setList]
  )

  // 取消完成
  const delFinish = useCallback(
    (id: string) => {
      const listNew = list.map((item) => {
        if (item.id === id) {
          return { ...item, isFinish: false }
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
    addFinish,
    delFinish,
  }
}
