import { createContext } from 'react'

interface StoreContext {
  // 首先要从这里定义类型
  title: string
  setTitle: (title: string) => void
  id_one: string
  setid: (pid: string) => void
  note: string
  setNote: (note: string) => void
}
const context = createContext<StoreContext>({
  // 这里写入数据的初始值，不过无所谓。
  title: '',
  setTitle: () => {},
  id_one: '',
  setid: () => {},
  note: '',
  setNote: () => {},
})
const StoreProvider = context.Provider // 设置context
export { context, StoreProvider } // 导出
