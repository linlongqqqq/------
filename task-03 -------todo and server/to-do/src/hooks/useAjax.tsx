import axios, { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ApiResp } from '../libs/module'
import useUser from './useUser'

export const useAxios = () => {
  const requsest = axios.create()
  const navigate = useNavigate()
  const location = useLocation()
  const searchUser = useUser
  const response = (response: AxiosResponse<ApiResp>) => {
    const path = ['/', '/register']
    console.log(response.data.code)
    if ((response.data.code === 20006 || response.data.code === 20004) && !path.includes(location.pathname)) {
      navigate('/')
      searchUser()
    } else if (response.data.code === 0 && path.includes(location.pathname)) {
      navigate('/main')
    }
    return response
  }
  const error = (error: any) => {
    console.log('err' + error)
    return Promise.reject(error)
  }

  useEffect(() => {
    const interId = requsest.interceptors.response.use(response, error)
    return () => requsest.interceptors.response.eject(interId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
}
export const AxiosFragment = () => {
  useAxios()
  return <React.Fragment />
}
