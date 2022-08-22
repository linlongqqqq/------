import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Result } from 'antd-mobile'
import 'react-quill/dist/quill.snow.css'
import { StoreProvider } from '../hooks/store'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [title, setTitle] = useState('')
  const [id_one, setid] = useState('')
  const [note, setNote] = useState('')
  if (pageProps.error) {
    return (
      <Result
        status="error"
        title="无法完成操作"
        description={pageProps.error}
      />
    )
  }
  const props = {
    title,
    setTitle,
    id_one,
    setid,
    note,
    setNote,
  }
  return (
    <StoreProvider value={props}>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
