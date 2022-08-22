import { createContext } from 'react'
import { IAlbum } from '../libs/module'

interface StoreContext {
  list: IAlbum[]
  setList: (list: IAlbum[]) => void
  isBottom: boolean
  setIsBottom: (isBottom: boolean) => void
  id_one: string
  setId: (id: string) => void
}

const context = createContext<StoreContext>({
  list: [],
  setList: () => {},
  isBottom: false,
  setIsBottom: () => {},
  id_one: '1',
  setId: () => {},
})
const StoreProvider = context.Provider

export { context, StoreProvider }
