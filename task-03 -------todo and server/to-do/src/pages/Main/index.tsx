import styles from './style.module.scss'
import { useContext, useState } from 'react'
import { Popup } from 'antd-mobile'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { context } from '../../hooks/store'

export default function Main() {
  const [isActive, setIsActive] = useState(1)
  const [visible3, setVisible3] = useState(false)
  const navigate = useNavigate()
  const { user, setUser } = useContext(context)
  const login = (
    <button
      className="login"
      type="button"
      onClick={() => {
        navigate('/', { replace: true })
      }}>
      去登录
    </button>
  )
  return (
    <div className={styles.main}>
      <header className="header">
        <button
          type="button"
          onClick={() => {
            setVisible3(true)
          }}>
          {<i className="iconfont icon-caidan "></i>}
        </button>
        {user.nickname ? '' : login}
      </header>
      <Outlet />
      <Popup
        visible={visible3}
        onMaskClick={() => {
          setVisible3(false)
        }}
        position="left"
        bodyStyle={{ minWidth: '60vw' }}>
        <div className={styles.menuHeader}>
          <button
            className={styles.menuButton}
            type="button"
            onClick={() => {
              setVisible3(false)
            }}>
            {<i className="iconfont icon-caidan "></i>}
          </button>
          <span>您好! {user.nickname ? user.nickname : '游客'}</span>
        </div>

        <div className={styles['list-one']}>
          <Link
            to="/main/"
            className={isActive === 1 ? styles.active : ''}
            onClick={() => {
              setIsActive(1)
              setVisible3(false)
            }}>
            <i className="iconfont icon-home"> </i>
            <span> 任务 </span>
          </Link>
          <Link
            to="/main/impontant"
            className={isActive === 2 ? styles.active : ''}
            onClick={() => {
              setIsActive(2)
              setVisible3(false)
            }}>
            <i className="iconfont icon-shoucang"> </i>
            <span> 重要 </span>
          </Link>
          <Link
            to="/main/finish"
            className={isActive === 3 ? styles.active : ''}
            onClick={() => {
              setIsActive(3)
              setVisible3(false)
            }}>
            <i className="iconfont icon-wancheng"> </i>
            <span> 完成 </span>
          </Link>
          <Link
            to="/main/repass"
            className={isActive === 4 ? styles.active : ''}
            onClick={() => {
              setIsActive(4)
              setVisible3(false)
            }}>
            <i className="iconfont icon-xiugaimima1"> </i>
            <span> 修改密码 </span>
          </Link>
        </div>
        <button
          type="button"
          className={styles.exit}
          onClick={() => {
            axios.get('/api/v1/user/layout').then((res) => {
              console.log(res)
              if (res.status === 200) {
                navigate('/', { replace: true })
                setUser({ _id: '', account: '', nickname: '', password: '', salt: '', createdAt: 1 })
              }
            })
          }}>
          退出登录
        </button>
      </Popup>
    </div>
  )
}
