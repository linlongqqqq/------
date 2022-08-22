import React, { useState } from 'react'
import { Form, Input, Button, Toast, Dialog, NavBar } from 'antd-mobile'
import styles from './styles.module.scss'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Repass() {
  const [oldpassw, setOldPassw] = useState('')
  const [newpassw, setNewPassw] = useState('')
  const [repassw, setRepassw] = useState('')
  const router = useRouter()
  const onFinish = (values: any) => {
    Dialog.alert({
      content: JSON.stringify(values),
    })
  }
  const back = () => router.push('/me')
  return (
    <div className={styles.repass}>
      <div className="title">
        <NavBar onBack={back}>修改密码</NavBar>
      </div>
      <Form
        // onFinish={onFinish}
        footer={
          <Button
            block
            type="submit"
            color="primary"
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
                    router.push('/login')
                  }
                })
            }}>
            提交
          </Button>
        }>
        <Form.Item
          name="旧密码"
          label="旧密码"
          rules={[{ required: true, message: '旧密码不能为空' }]}>
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
        <Form.Item
          name="新密码"
          label="新密码"
          rules={[{ required: true, message: '新密码不能为空' }]}>
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
        <Form.Item
          name="确认密码"
          label="确认密码"
          rules={[{ required: true, message: '确认密码不能为空' }]}>
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
      </Form>
      {/* <footer>
        <Button
          block
          color="primary"
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
                  router.push('/login')
                }
              })
          }}>
          提交
        </Button>
      </footer> */}
    </div>
  )
}
