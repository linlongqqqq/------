import { useCallback, useContext, useEffect } from 'react'
import { getUser } from '../service/task'
import { context } from './store'

export default function useUser() {
  const { setUser } = useContext(context)

  const searchUser = useCallback(async () => {
    const user_session = await getUser()
    setUser(user_session)
  }, [setUser])

  useEffect(() => {
    searchUser()
  }, [searchUser])
  return searchUser
}
