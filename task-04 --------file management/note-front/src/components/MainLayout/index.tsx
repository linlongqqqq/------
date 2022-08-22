import { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import { TabBar } from 'antd-mobile'
import Image from 'next/image'
import ShareIcon from '../ShareIcon/index'

import {
  UserOutline,
  FolderOutline,
  ClockCircleOutline,
} from 'antd-mobile-icons'

interface Props {
  activeKey: string
}

export default function MainLayout(props: PropsWithChildren<Props>) {
  const router = useRouter()

  return (
    <div className="page">
      <main className="main">{props.children}</main>
      <TabBar
        safeArea
        className="navbar"
        activeKey={props.activeKey}
        onChange={(key) => router.push(key)}>
        <TabBar.Item key="/" icon={<ClockCircleOutline />} title="最近" />
        <TabBar.Item key="/folders" icon={<FolderOutline />} title="文件夹" />
        <TabBar.Item key="/share" icon={<ShareIcon />} title="分享" />
        <TabBar.Item key="/me" icon={<UserOutline />} title="我" />
      </TabBar>
    </div>
  )
}
