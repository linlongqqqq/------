import { GetServerSideProps } from 'next'
import React, { useContext, useEffect } from 'react'
import { context } from '../../hooks/store'
import * as ssrService from '../../services/ssr'
import { formatCookie } from '../../services/session'
import styles from './styles.module.scss'
import Image from 'next/image'

interface Props {
  viewed: string
  note: string
  title: string
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const url = ctx.query.url as string
  const props = await ssrService.shareShow(formatCookie(ctx.req.cookies), url)
  return props
}

export default function Share(props: Props) {
  console.log(props.note)
  console.log(props.viewed)

  return (
    <div className={styles.show}>
      <header className={styles.shareShow_title}>
        <span className="title">NextNote</span>
        <div className="user">
          <Image src="/img/user.svg" height={30} width={30} alt="用户" />
        </div>
        <span className="liulan">浏览次数：{props.viewed}</span>
      </header>
      <div className={styles.con}>
        <div className={styles.newTitle}>{props.title}</div>
        <div dangerouslySetInnerHTML={{ __html: props.note }} />
      </div>
    </div>
  )
}
