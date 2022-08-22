import styles from './style.module.scss'
import AlbumItem from '../../components/IAlbumItem'
import { context } from '../../hooks/store'
import { useContext, useEffect, useState } from 'react'
import { IAlbum } from '../../libs/module'
import BottomMenu from '../BottomMenu'

//type 代表页面的id 比如 任务、重要、完成页面。
interface Props {
  type: number
}

export default function Albums({ type }: Props) {
  //定义 是否显示空图标
  const [isKong, setIsKong] = useState(true)
  //定义 一个新列表来接受 条件选择后的列表
  const [newList, setNewList] = useState<IAlbum[]>([])
  //接受 list数据
  const { list } = useContext(context)
  useEffect(() => {
    if (type === 1) {
      setNewList(list.filter((item) => item.isFinish !== true))
    } else if (type === 2) {
      setNewList(list.filter((item) => item.isLike === true))
    } else {
      setNewList(list.filter((item) => item.isFinish === true))
    }
    if (newList.length !== 0) {
      setIsKong(false)
    }
  }, [list, type, newList.length])

  return (
    <div className={styles.list}>
      <span className={isKong === true ? '' : 'isKong'}>
        <i className="iconfont icon-kong"></i>
      </span>
      {newList.map((item) => (
        <AlbumItem
          list={item}
          key={item.id}
          id={item.id}
          isFinish={item.isFinish}
          isLike={item.isLike}
        />
      ))}
      <BottomMenu />
    </div>
  )
}
