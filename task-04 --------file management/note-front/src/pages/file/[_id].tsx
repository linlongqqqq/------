import { NavBar } from 'antd-mobile'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import React, { useContext, useState } from 'react'
import styles from './styles.module.scss'
import * as ssrService from '../../services/ssr'
import { formatCookie } from '../../services/session'
import Image from 'next/image'
import axios from 'axios'
interface Props {
  title: string
  note: string
  _id: string
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const _id = ctx.query._id as string
  const props = await ssrService.fileItem(formatCookie(ctx.req.cookies), _id)
  return props
}

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

export default function File(props: Props) {
  const [text, setText] = useState(props.note)
  return (
    <div className={styles.file}>
      <header className="folder_title">
        <NavBar back="" onBack={() => window.history.back()}>
          {props.title}
          <span
            className={styles.save}
            onClick={() => {
              axios
                .post('/api/v1/file/update', {
                  _id: props._id,
                  note: text,
                })
                .then((res) => {
                  console.log(res)
                })
            }}>
            <Image src="/img/save.svg" width={23} height={23} alt="save" />
          </span>
        </NavBar>
      </header>
      <QuillNoSSRWrapper
        value={text}
        theme="snow"
        onChange={(val) => {
          setText(val)
        }}
      />
    </div>
  )
}
