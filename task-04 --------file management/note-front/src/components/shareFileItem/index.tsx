import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
import Image from 'next/image'
import styles from './style.module.scss'
import { Share } from '../../libs/models'
import { useContext } from 'react'
import { context } from '../../hooks/store'
import { useRouter } from 'next/router'

interface Props {
  file: Share
  changeVsb2: (message: boolean) => void
  refresh: (id?: string | undefined) => Promise<void>
}
export default function ShareItem({ file, changeVsb2, refresh }: Props) {
  const router = useRouter()
  const thisFile = (
    <Image src="/img/file.svg" alt="文件" width={30} height={30} />
  )
  const thisFolder = (
    <Image src="/img/folder.svg" alt="文件夹" width={30} height={30} />
  )
  const { setTitle, setid } = useContext(context)
  return (
    <div className={styles.warp}>
      <div className={styles.icon}>{thisFile}</div>
      {/* 内容区域 */}
      <div
        className={styles.content}
        onClick={() => {
          console.log(file.noteId)

          router.push('/file/' + file.noteId)
          // refresh(file.noteId)
        }}>
        <div className={styles.content_title}> {file.title}</div>
        <div className={styles.content_time}>
          {dayjs(file.createdAt).fromNow()}
        </div>
      </div>
      {/* 菜单图标 */}
      <div
        className={styles.footerIcon}
        onClick={() => {
          changeVsb2(true)
          setTitle(file.title)
          setid(file.noteId)
        }}>
        <Image src="/img/menu.svg" width={20} height={20} alt="菜单" />
      </div>
    </div>
  )
}
