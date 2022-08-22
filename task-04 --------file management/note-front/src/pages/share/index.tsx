import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import { PullToRefresh, InfiniteScroll, Toast, Empty } from 'antd-mobile'
import ShareItem from '../../components/shareFileItem'
import MainLayout from '../../components/MainLayout'
import useShare from '../../hooks/useShare'
import * as ssrService from '../../services/ssr'
import { formatCookie } from '../../services/session'
import ListMenu from '../../components/ListMenu'
import { Share } from '../../libs/models'

interface Props {
  items: Share[]
  total: number
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const props = await ssrService.shareProps(formatCookie(ctx.req.cookies))
  return props
}

const Folder: NextPage<Props> = (props) => {
  const { sharedFiles, hasMore, error, loadMore, listShares } = useShare(
    props.items,
    props.total
  )
  const [visible2, setVisible2] = useState(false)
  const [isFolder, setIsFolder] = useState(false)

  const changeVsb2 = useCallback((visible2: boolean) => {
    visible2 ? setVisible2(visible2) : ''
  }, [])
  const empty = (
    <Empty
      className="empty"
      style={{ padding: '64px 0' }}
      imageStyle={{ width: 128 }}
      description="暂无数据"
    />
  )
  useEffect(() => {
    if (error) {
      Toast.show({
        content: error,
      })
    }
  }, [error])

  return (
    <MainLayout activeKey="/share">
      <PullToRefresh onRefresh={listShares}>
        <div>
          {sharedFiles.length === 0 ? empty : ''}
          {sharedFiles.map((item) => (
            <ShareItem
              file={item}
              key={item._id}
              changeVsb2={changeVsb2}
              refresh={listShares}
            />
          ))}
        </div>
        {/* 打开、删除、分享 */}
        <ListMenu
          visible2={visible2}
          setVisible2={setVisible2}
          alternative={listShares}
          isFolder={isFolder}
        />
        <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
      </PullToRefresh>
    </MainLayout>
  )
}
export default Folder
