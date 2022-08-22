import React, { useState } from 'react'
import { Form, Input, Button, Toast } from 'antd-mobile'
import styles from './styles.module.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Repass() {
  const [oldpassw, setOldPassw] = useState('')
  const [newpassw, setNewPassw] = useState('')
  const [repassw, setRepassw] = useState('')
  const navigate = useNavigate()
  return (
    <div className={styles.repass}>
      <Form layout="horizontal">
        <div className="title">
          <h3>修改密码</h3>
        </div>
        <Form.Item label="旧密码" name="oldpassw">
          <Input
            placeholder="请输入旧密码"
            clearable
            type="password"
            value={oldpassw}
            onChange={(val) => {
              setOldPassw(val)
            }}
          />
        </Form.Item>
        <Form.Item label="新密码" name="newpassw">
          <Input
            placeholder="请输入密码"
            clearable
            type="password"
            value={newpassw}
            onChange={(val) => {
              setNewPassw(val)
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
              if (newpassw !== repassw) {
                Toast.show({
                  content: '两次密码不一致',
                })
                return
              }
              if (newpassw.length < 8) {
                Toast.show({
                  content: '密码长度要大于8位',
                })
                return
              }
              axios
                .post('/api/v1/user/repass', {
                  oldpassword: oldpassw,
                  newpassword: newpassw,
                })
                .then((res) => {
                  console.log(res)
                  if (res.status === 200) {
                    navigate('/', { replace: true })
                  }
                })
            }}>
            确认
          </Button>
        </footer>
      </Form>
    </div>
  )
}
