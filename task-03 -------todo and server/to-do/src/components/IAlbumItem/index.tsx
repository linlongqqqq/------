import React, { useContext } from 'react'
import styles from './styles.module.scss'
import { IAlbum } from '../../libs/module'
import { context } from '../../hooks/store'
import axios from 'axios'

// list列表的类型
interface Props {
  listItem: IAlbum
  listTasks: () => Promise<void>
}

export default function AlbumItem({ listItem, listTasks }: Props) {
  //底部遮罩的开关
  const { visible1, setVisible1, setId } = useContext(context)
  let id = listItem._id
  let isFinish = listItem.finished
  let isLike = listItem.important
  //底部遮罩
  return (
    <div className={styles.list}>
      <div className="item">
        <span className="finish">
          <i
            className={isFinish ? 'iconfont icon-wancheng' : 'iconfont icon-xingzhuang-tuoyuanxing'}
            onClick={() => {
              axios
                .post('/api/v1/task/update', {
                  _id: id,
                  finished: !isFinish,
                })
                .then((res) => {
                  console.log(res)
                  listItem.finished = !listItem.finished
                  listTasks()
                })
            }}></i>
        </span>
        <p
          className={isFinish ? 'yes_finish_context' : 'no_finish_context'}
          onClick={() => {
            setVisible1(!visible1)
            setId(id)
          }}>
          {listItem.context}
        </p>
        <span className="like">
          <i
            className={isLike ? 'iconfont icon-shoucang' : 'iconfont icon-shoucang2'}
            onClick={() => {
              axios
                .post('/api/v1/task/update', {
                  _id: id,
                  important: !isLike,
                })
                .then((res) => {
                  console.log(res)
                  listTasks()
                })
            }}></i>
        </span>
      </div>
    </div>
  )
}
