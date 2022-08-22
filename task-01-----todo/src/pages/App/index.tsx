import Dask from '../../pages/Dask'
import Finish from '../../pages/Finish'
import Important from '../../pages/important'
import styles from './styles.module.scss'
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { StoreProvider } from '../../hooks/store'
import { IAlbum } from '../../libs/module'

export default function App() {
  //定义遮罩生效或者不生效
  const [isCover, setisCover] = useState(true)
  // 判断哪一个列表被选中
  const [isActive, setIsActive] = useState(1)
  const [list, setList] = useState(() => {
    let newLst = localStorage.getItem('list')
    if (newLst !== null) {
      const tmp = JSON.parse(newLst) as IAlbum[]
      return tmp
    } else return [] as IAlbum[]
  })
  const [isBottom, setIsBottom] = useState<boolean>(false)
  const [id_one, setId] = useState<string>('1')

  //当list值发生变化的时候，调用来存值。
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  // 用于判断遮罩是否生效。
  const onButtonClick = (): void => {
    setisCover(!isCover)
  }
  // 点击菜单事件来改变isActive的值 ，用于控制active属性动态绑定到谁。
  // 可以优化。。
  const onListClick1 = (): void => {
    setIsActive(1)
    setisCover(!isCover)
  }
  const onListClick2 = (): void => {
    setIsActive(2)
    setisCover(!isCover)
  }
  const onListClick3 = (): void => {
    setIsActive(3)
    setisCover(!isCover)
  }
  return (
    <StoreProvider
      value={{ list, setList, isBottom, setIsBottom, id_one, setId }}>
      <BrowserRouter>
        <div className={styles.menu}>
          <div
            className={isCover ? 'styleCoverYes' : 'styleCoverNo'}
            onClick={onButtonClick}></div>
          <div className={isCover ? 'styleMenuYes' : 'styleMenuNo'}>
            <button
              type="button"
              onClick={onButtonClick}
              className="menuButton">
              {<i className="iconfont icon-caidan "></i>}
            </button>
            <div className="list-one ">
              <Link
                to="/"
                className={isActive === 1 ? 'active' : ''}
                onClick={onListClick1}>
                <i className="iconfont icon-home"> </i>
                <span> 任务 </span>
              </Link>
              <Link
                to="/impontant"
                className={isActive === 3 ? 'active' : ''}
                onClick={onListClick3}>
                <i className="iconfont icon-shoucang"> </i>
                <span> 重要 </span>
              </Link>
              <Link
                to="/finish"
                className={isActive === 2 ? 'active' : ''}
                onClick={onListClick2}>
                <i className="iconfont icon-wancheng"> </i>
                <span> 完成 </span>
              </Link>
            </div>
          </div>
          <header className="header">
            <button type="button" onClick={onButtonClick}>
              {<i className="iconfont icon-caidan "></i>}
            </button>
          </header>
          {/* <BottomMenu /> */}
          <Routes>
            <Route path="/" element={<Dask />} />
            <Route path="/finish" element={<Finish />} />
            <Route path="/impontant" element={<Important />} />
          </Routes>
        </div>
      </BrowserRouter>
    </StoreProvider>
  )
}
