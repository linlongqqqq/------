import React, { useContext } from 'react'
import styles from './styles.module.scss'
import { IAlbum } from '../../libs/module'
import useFinish from '../../hooks/useFinish'
import useLike from '../../hooks/useLike'
import { context } from '../../hooks/store'

// list列表的类型
interface Props {
  list: IAlbum
  id: string
  isFinish: boolean
  isLike: boolean
}

export default function AlbumItem({ list, id, isFinish, isLike }: Props) {
  //底部遮罩的开关
  const { isBottom, setIsBottom, setId } = useContext(context)
  const { addFinish, delFinish } = useFinish()
  const { addLike, delLike } = useLike()

  //底部遮罩

  return (
    <div className={styles.list}>
      <div className="item">
        <span className="finish">
          <i
            className={
              isFinish
                ? 'iconfont icon-wancheng'
                : 'iconfont icon-xingzhuang-tuoyuanxing'
            }
            onClick={() => {
              if (isFinish === false) {
                addFinish(id)
              } else {
                delFinish(id)
              }
              // console.log(list)
            }}></i>
        </span>
        <p
          className={isFinish ? 'yes_finish_context' : 'no_finish_context'}
          onClick={() => {
            setIsBottom(!isBottom)
            setId(id)
          }}>
          {list.context}
        </p>
        <span className="like">
          <i
            className={
              isLike ? 'iconfont icon-shoucang' : 'iconfont icon-shoucang2'
            }
            onClick={() => {
              if (isLike === false) {
                addLike(id)
              } else {
                delLike(id)
              }
              // console.log(list)
            }}></i>
        </span>
      </div>
    </div>
  )
}
