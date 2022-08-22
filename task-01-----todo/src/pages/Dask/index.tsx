import styles from './style.module.scss'
import IAlbum from '../../components/Albums'
import { v4 as uuid } from 'uuid'
import { context } from '../../hooks/store'
import { useContext } from 'react'

export default function Dask() {
  const { list, setList } = useContext(context)
  const onkeydown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const text = event.target.value.trim()
    console.log(event.code)
    if (event.code === 'Enter') {
      if (text !== '') {
        setList([
          ...list,
          {
            id: uuid(),
            context: text,
            isFinish: false,
            isLike: false,
          },
        ])
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
      <IAlbum type={1} />
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
    </div>
  )
}
