import React, { useState } from 'react'
import { Form, Input, Button, NavBar, Toast } from 'antd-mobile'
import styles from './style.module.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [account, setAccount] = useState('')
  const [nickname, setNickname] = useState('')
  const [passw, setPassw] = useState('')
  const [repassw, setRepassw] = useState('')

  const navigate = useNavigate()

  var usename = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/

  return (
    <div className={styles.register}>
      <Form layout="horizontal" className="form">
        <div className="title">
          <NavBar
            back="返回"
            onBack={() => {
              navigate('/', { replace: true })
            }}>
            注册
          </NavBar>
        </div>
        <Form.Item label="账号" name="account">
          <Input
            placeholder="请输入手机号"
            clearable
            value={account}
            onChange={(val) => {
              setAccount(val)
            }}
          />
        </Form.Item>
        <Form.Item label="昵称" name="nickname">
          <Input
            placeholder="请输入10字以内昵称"
            clearable
            value={nickname}
            onChange={(val) => {
              setNickname(val)
            }}
          />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input
            placeholder="请输入密码（大于8位）"
            clearable
            type="password"
            value={passw}
            onChange={(val) => {
              setPassw(val)
            }}
          />
        </Form.Item>
        <Form.Item label="确认密码" name="repassword">
          <Input
            placeholder="请再次输入密码"
            clearable
            type="password"
            value={repassw}
            onChange={(val) => {
              setRepassw(val)
            }}
          />
        </Form.Item>
        <footer>
          <Button
            block
            color="warning"
            size="large"
            onClick={() => {
              if (passw !== repassw) {
                Toast.show({
                  content: '两次密码不一致',
                })
                return
              } else if (!usename.test(account)) {
                Toast.show({
                  content: '用户名不匹配，请输入手机号',
                })
                return
              } else if (nickname.length > 10) {
                Toast.show({
                  content: '昵称长度超过限制',
                })
                return
              } else if (passw.length < 8) {
                Toast.show({
                  content: '密码长度要大于8位',
                })
                return
              } else {
                axios
                  .post('/api/v1/user/create', {
                    account: account,
                    nickname: nickname,
                    password: passw,
                  })
                  .then((res) => {
                    console.log(res)
                    if (res.status === 200) {
                      navigate('/', { replace: true })
                    }
                  })
                  .catch(() => {})
              }
            }}>
            注册
          </Button>
        </footer>
      </Form>
    </div>
  )
}
