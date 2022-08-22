import React from 'react'
import styles from './styles.module.scss'
import IAlbum from '../../components/Albums'

export default function Important() {
  return (
    <div className={styles.important}>
      <header className="header">
        <span className="iconfont icon-shoucang"></span>
        <span className="text">重要</span>
      </header>
      <IAlbum type={2} />
    </div>
  )
}
