import { useState } from 'react'
import { Form, Input, Button, Toast } from 'antd-mobile'
import styles from './style.module.scss'
import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Login: NextPage = () => {
  const [account, setAccount] = useState('')
  const [passw, setPassw] = useState('')
  const router = useRouter()
  return (
    <div className={styles.login}>
      <Form layout="horizontal">
        <span className={styles.main_title}>Note</span>
        <div className="title">
          <h3>登录</h3>
        </div>
        <Form.Item label="用户名" name="username">
          <Input
            placeholder="请输入手机号"
            clearable
            value={account}
            onChange={(val) => {
              setAccount(val)
            }}
          />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input
            placeholder="请输入密码"
            clearable
            type="password"
            value={passw}
            onChange={(val) => {
              setPassw(val)
            }}
          />
        </Form.Item>
        <footer>
          <Button
            size="middle"
            color="primary"
            onClick={() => {
              router.push('/register')
            }}>
            注册
          </Button>
          <Button
            size="middle"
            color="primary"
            onClick={() => {
              axios
                .post('/api/v1/user/login', {
                  account: account,
                  password: passw,
                })
                .then((res) => {
                  console.log(res)
                  if (res.status === 200) {
                    router.push('/')
                  }
                })
                .catch(() => {
                  Toast.show({
                    content: '用户名或密码错误',
                  })
                })
            }}>
            登录
          </Button>
        </footer>
      </Form>
    </div>
  )
}
export default Login
