import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../login'
import Register from '../register'
import Main from '../Main'
import Dask from '../Dask'
import Finish from '../Finish'
import Important from '../important'
import { StoreProvider } from '../../hooks/store'
import { User } from '../../libs/module'
import Repass from '../repass'
import { AxiosFragment } from '../../hooks/useAjax'
import { getUser } from '../../service/task'

export default function App() {
  const [visible1, setVisible1] = useState<boolean>(false)
  const [id_one, setId] = useState<string>('1')
  const [user, setUser] = useState<User>({ _id: '', account: '', nickname: '', password: '', salt: '', createdAt: 1 })
  const [type, setType] = useState(1)

  const searchUser = useCallback(async () => {
    const user_session = await getUser()
    setUser(user_session)
  }, [setUser])

  useEffect(() => {
    searchUser()
  }, [searchUser])

  const props = {
    visible1,
    setVisible1,
    id_one,
    setId,
    setUser,
    user,
    type,
    setType,
  }

  return (
    <StoreProvider value={props}>
      <BrowserRouter>
        <AxiosFragment />
        <Routes>
          <Route path="/main" element={<Main />}>
            <Route path="" element={<Dask />} />
            <Route path="finish" element={<Finish />} />
            <Route path="impontant" element={<Important />} />
            <Route path="repass" element={<Repass />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}
