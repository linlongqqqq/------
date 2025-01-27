import styles from './style.module.scss'
import { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'

import useTasks from '../../hooks/useTasks'
import { InfiniteScroll, Popup, PullToRefresh, Toast } from 'antd-mobile'
import AlbumItem from '../../components/IAlbumItem'
import { context } from '../../hooks/store'
import { getUser } from '../../service/task'

export default function Dask() {
  const { list, error, hasMore, listTasks, loadMore } = useTasks()
  const [iskong, setIsKong] = useState(false)
  const { type, setType, setVisible1, visible1, id_one, setUser } = useContext(context)
  const [changeFinish, setChangeFinish] = useState(true)
  const [changeLike, setChangeLike] = useState(true)
  const tubiao = (
    <span>
      <i className="iconfont icon-kong"></i>
    </span>
  )
  const searchUser = useCallback(async () => {
    const user_session = await getUser()
    setUser(user_session)
  }, [setUser])

  useEffect(() => {
    searchUser()
  }, [searchUser])

  useEffect(() => {
    if (error) {
      Toast.show({
        content: error,
      })
    }
    listTasks()
  }, [error, listTasks])

  useEffect(() => {
    if (list.length === 0) {
      setIsKong(true)
    } else {
      setIsKong(false)
    }
  }, [list])

  useEffect(() => {
    setType(1)
  }, [type, listTasks, setType])

  useEffect(() => {
    list.forEach((item) => {
      if (item._id === id_one) {
        setChangeFinish(item.finished)
        setChangeLike(item.important)
      }
    })
  }, [id_one, list, listTasks])

  const onkeydown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const text = event.target.value.trim()
    if (event.code === 'Enter') {
      if (text !== '') {
        axios
          .post('/api/v1/task/create', {
            context: text,
          })
          .then((res) => {
            console.log(res)
            listTasks()
          })
        event.target.value = ''
      }
    }
  }
  return (
    <div className={styles.dask}>
      <header className="header">
        <span className="iconfont icon-homefill"></span>
        <span className="text">任务</span>
      </header>
      <div className={styles.list}>
        {iskong ? tubiao : ''}
        <PullToRefresh
          onRefresh={async () => {
            listTasks()
          }}>
          {list.map((item) => (
            <AlbumItem listItem={item} key={item._id} listTasks={listTasks} />
          ))}
          <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
        </PullToRefresh>
      </div>
      <footer className="styleFooter">
        <i className="iconfont icon-jiahao"></i>
        <input
          className="styleInput"
          type="text"
          placeholder="添加任务"
          onChange={(event) => {
            const value = event.target.value.trim()
            event.target.value = value
          }}
          onKeyDown={onkeydown}></input>
      </footer>
      <Popup
        visible={visible1}
        onMaskClick={() => {
          setVisible1(false)
        }}
        bodyStyle={{ minHeight: '40vh' }}>
        <>
          <div className={styles.title}>选择操作</div>
          <div
            className={styles.item}
            onClick={() => {
              setVisible1(false)
              axios
                .post('/api/v1/task/update', {
                  _id: id_one,
                  finished: !changeFinish,
                })
                .then((res) => {
                  console.log(res)
                  listTasks()
                })
            }}>
            {changeFinish ? '标记为未完成' : '标记为已完成'}
          </div>
          <div
            className={styles.item}
            onClick={() => {
              setVisible1(false)
              axios
                .post('/api/v1/task/update', {
                  _id: id_one,
                  important: !changeLike,
                })
                .then((res) => {
                  console.log(res)
                  listTasks()
                })
            }}>
            {changeLike ? '标记为不重要' : '标记为重要'}
          </div>
          <div
            className={styles.item1}
            onClick={() => {
              setVisible1(false)
              axios
                .post('/api/v1/task/remove', {
                  _id: id_one,
                })
                .then((res) => {
                  console.log(res)
                  listTasks()
                })
            }}>
            删除任务
          </div>
          <div className={styles.interval}></div>
          <div className={styles.item} onClick={() => setVisible1(!visible1)}>
            取消
          </div>
        </>
      </Popup>
    </div>
  )
}
