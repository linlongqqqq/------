import React from 'react'
import styles from './styles.module.scss'
import IAlbum from '../../components/Albums'
export default function Finish() {
  return (
    <div className={styles.finish}>
      <header className="header">
        <span className="iconfont icon-wancheng"></span>
        <span className="text">完成</span>
      </header>
      <IAlbum type={3} />
    </div>
  )
}
