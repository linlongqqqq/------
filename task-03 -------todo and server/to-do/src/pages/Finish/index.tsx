import { InfiniteScroll, Popup, PullToRefresh, Toast } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AlbumItem from '../../components/IAlbumItem'
import { context } from '../../hooks/store'
import useTasks from '../../hooks/useTasks'
import styles from './styles.module.scss'

export default function Finish() {
  const { list, error, hasMore, listTasks, loadMore } = useTasks()
  const { type, setType, setVisible1, visible1, id_one } = useContext(context)
  const [changeFinish, setChangeFinish] = useState(true)
  const [changeLike, setChangeLike] = useState(true)
  const [iskong, setIsKong] = useState(false)

  const tubiao = (
    <span>
      <i className="iconfont icon-kong"></i>
    </span>
  )

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
    setType(3)
  }, [type, listTasks, setType])

  useEffect(() => {
    list.forEach((item) => {
      if (item._id === id_one) {
        setChangeFinish(item.finished)
        setChangeLike(item.important)
      }
    })
  }, [id_one, list, listTasks])

  return (
    <div className={styles.finish}>
      <header className="header">
        <span className="iconfont icon-wancheng"></span>
        <span className="text">完成</span>
      </header>
      <div className={styles.list}>
        {iskong ? tubiao : ''}
        <PullToRefresh
          onRefresh={async () => {
            await sleep(1000)
            listTasks()
          }}>
          {list.map((item) => (
            <AlbumItem listItem={item} key={item._id} listTasks={listTasks} />
          ))}
          <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
        </PullToRefresh>
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
    </div>
  )
}
