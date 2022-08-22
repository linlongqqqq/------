import React, { useContext, useEffect, useState } from 'react'
import style from './styles.module.scss'
import { context } from '../../hooks/store'

export default function BottomMenu() {
  const { list, setList, isBottom, setIsBottom, id_one } = useContext(context)
  const [changeFinish, setChangeFinish] = useState(true)
  const [cahngeLike, setChangeLike] = useState(true)
  useEffect(() => {
    list.forEach((item) => {
      if (item.id === id_one) {
        setChangeFinish(item.isFinish)
        setChangeLike(item.isLike)
      }
    })
  }, [id_one, list])

  const onFinish = () => {
    setIsBottom(!isBottom)
    const lst = list.map((item) =>
      id_one === item.id ? { ...item, isFinish: !item.isFinish } : item
    )
    setList(lst)
  }
  const onLike = () => {
    setIsBottom(!isBottom)
    const lst = list.map((item) =>
      item.id === id_one ? { ...item, isLike: !item.isLike } : item
    )
    setList(lst)
  }
  const onDelete = () => {
    setIsBottom(!isBottom)
    setList(list.filter((item) => item.id !== id_one))
    console.log(list)
  }
  return (
    <div className={style.bottomMenu}>
      <div
        className={!isBottom ? 'cover_yes' : 'cover_no'}
        onClick={() => setIsBottom(!isBottom)}></div>
      <div className={!isBottom ? 'select_yes' : 'select_no'}>
        <div className="title">选择操作</div>
        <div className="item" onClick={onFinish}>
          {/* 标记为已完成 */}
          {changeFinish ? '标记为未完成' : '标记为已完成'}
        </div>
        <div className="item" onClick={onLike}>
          {/* 标记为重要 */}
          {cahngeLike ? '标记为不重要' : '标记为重要'}
        </div>
        <div className="item del" onClick={onDelete}>
          删除任务
        </div>
        <div className="interval"></div>
        <div className="item " onClick={() => setIsBottom(!isBottom)}>
          取消
        </div>
      </div>
    </div>
  )
}
