import React, { useContext } from 'react'
import { useCallback, useEffect, useState } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import {
  PullToRefresh,
  InfiniteScroll,
  Toast,
  Empty,
  Popup,
  NavBar,
} from 'antd-mobile'
import { IFile } from '../../libs/models'
import FileItem from '../../components/FileItem'
import MainLayout from '../../components/MainLayout'
import useFiles from '../../hooks/useFiles'
import * as ssrService from '../../services/ssr'
import { formatCookie } from '../../services/session'
import Image from 'next/image'
import axios from 'axios'
import ListMenu from '../../components/ListMenu'
interface Props {
  items: IFile[]
  total: number
  content: Title
  title?: string
  _id?: string
}
interface Title {
  title: string
  note?: string
  _id: string
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const pid = ctx.query.pid as string
  const props = await ssrService.fileProps(formatCookie(ctx.req.cookies), pid)
  const title = await ssrService.fileItem(formatCookie(ctx.req.cookies), pid)
  return {
    props: {
      ...props.props,
      ...title.props,
    },
  }
}

const Folder: NextPage<Props> = (props: Props) => {
  const { files, hasMore, error, loadMore, listFiles } = useFiles(
    props.items,
    props.total
  )
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [isFolder, setIsFolder] = useState(false)

  const changeVsb2 = useCallback((isFolder: boolean, visible2?: boolean) => {
    visible2 ? setVisible2(visible2) : ''
    setIsFolder(isFolder)
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
    <MainLayout activeKey="/folder">
      <div className="folder_title">
        <NavBar
          back=""
          onBack={async () => {
            await listFiles()
            window.history.back()
          }}>
          {props.title}
        </NavBar>
      </div>
      <PullToRefresh onRefresh={listFiles}>
        <div>
          {files.length === 0 ? empty : ''}
          {files.map((item) => (
            <FileItem
              file={item}
              key={item._id}
              changeVsb2={changeVsb2}
              refresh={listFiles}
            />
          ))}
          <div
            className="file_add"
            onClick={() => {
              setVisible1(true)
            }}>
            <Image src="/img/add.svg" width={20} height={20} alt="add" />
          </div>
        </div>
        {/* 新建文件夹 */}
        <Popup
          visible={visible1}
          onMaskClick={() => {
            setVisible1(false)
          }}
          bodyStyle={{ minHeight: '26vh' }}>
          <div className="adm-action-sheet-button-list">
            <div>
              <a
                className="adm-action-sheet-button-item"
                onClick={() => {
                  axios
                    .post('/api/v1/file/create', {
                      isFolder: true,
                      title: '未命名',
                      pid: props._id,
                    })
                    .then((res) => {
                      console.log(res)
                      setVisible1(false)
                      listFiles(props._id)
                    })
                }}>
                <div className="adm-action-sheet-button-item-name">
                  新建文件夹
                </div>
              </a>
            </div>
            <div>
              <a
                className="adm-action-sheet-button-item"
                onClick={() => {
                  axios
                    .post('/api/v1/file/create', {
                      isFolder: false,
                      title: '未命名',
                      note: 'hello !',
                      pid: props._id,
                    })
                    .then((res) => {
                      console.log(res)
                      setVisible1(false)
                      listFiles(props._id)
                    })
                }}>
                <div className="adm-action-sheet-button-item-name">
                  新建笔记
                </div>
              </a>
            </div>
            <div className="adm-action-sheet-button-cancel">
              <a
                className="adm-action-sheet-button-item-cancel"
                onClick={() => {
                  setVisible1(false)
                }}>
                <div className="adm-action-sheet-button-item-name">取消</div>
              </a>
            </div>
          </div>
        </Popup>
        {/* 打开、删除、分享 */}
        <ListMenu
          visible2={visible2}
          setVisible2={setVisible2}
          alternative={listFiles}
          isFolder={isFolder}
          type={true}
        />
        <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
      </PullToRefresh>
    </MainLayout>
  )
}
export default Folder
