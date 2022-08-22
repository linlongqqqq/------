import { useState } from 'react'
import { Form, Input, Button, Toast } from 'antd-mobile'
import styles from './style.module.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [account, setAccount] = useState('')
  const [passw, setPassw] = useState('')
  const navigate = useNavigate()
  return (
    <div className={styles.login}>
      <Form layout="horizontal">
        <span>TO DO</span>
        <div className="title">
          <h2>登录</h2>
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
          <Link to="/register">
            <Button size="middle" color="primary">
              注册
            </Button>
          </Link>
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
                    navigate('/main', { replace: true })
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
