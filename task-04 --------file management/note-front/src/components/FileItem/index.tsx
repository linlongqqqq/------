import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
import Image from 'next/image'
import styles from './style.module.scss'
import { IFile, Share } from '../../libs/models'
import { useContext } from 'react'
import { context } from '../../hooks/store'
import { useRouter } from 'next/router'

interface Props {
  file: IFile
  changeVsb2: (isFolder: boolean, message?: boolean) => void
  refresh: (id?: string | undefined) => Promise<void>
}

export default function FileItem({ file, changeVsb2, refresh }: Props) {
  const router = useRouter()
  const thisFile = (
    <Image src="/img/file.svg" alt="文件" width={30} height={30} />
  )
  const thisFolder = (
    <Image src="/img/folder.svg" alt="文件夹" width={30} height={30} />
  )
  const { setTitle, setid } = useContext(context)
  return (
    <div
      className={styles.warp}
      onClick={() => {
        changeVsb2(file.isFolder)
      }}>
      <div className={styles.icon}>
        {file.isFolder === true ? thisFolder : thisFile}
      </div>
      {/* 内容区域 */}
      <div
        className={styles.content}
        onClick={() => {
          if (file.isFolder === true) {
            router.push('/folder/' + file._id)
            refresh(file._id)
          } else {
            router.push('/file/' + file._id)
            refresh(file._id)
          }
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
          changeVsb2(file.isFolder, true)
          setTitle(file.title)
          setid(file._id)
        }}>
        <Image src="/img/menu.svg" width={20} height={20} alt="菜单" />
      </div>
    </div>
  )
}
