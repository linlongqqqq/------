import { createContext } from 'react'
import { User } from '../libs/module'

interface StoreContext {
  visible1: boolean
  setVisible1: (isBottom: boolean) => void
  id_one: string
  setId: (id: string) => void
  user: User
  setUser: (user: User) => void
  type: number
  setType: (type: number) => void
}

const context = createContext<StoreContext>({
  // total:[]
  visible1: false,
  setVisible1: () => {},
  id_one: '1',
  setId: () => {},
  user: {
    _id: '',
    account: '',
    nickname: '',
    password: '',
    salt: '',
    createdAt: 1,
  },
  setUser: () => {},
  type: 1,
  setType: () => {},
})
const StoreProvider = context.Provider

export { context, StoreProvider }
