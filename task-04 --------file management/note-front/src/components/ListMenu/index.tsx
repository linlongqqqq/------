import { Modal, Popup, Toast } from 'antd-mobile'
import React, { useContext, useState } from 'react'
import Share from '../Share'
import { useRouter } from 'next/router'
import { context } from '../../hooks/store'
import axios from 'axios'

interface props {
  visible2: boolean
  setVisible2: React.Dispatch<React.SetStateAction<boolean>>
  alternative: (id?: string | undefined) => Promise<void>
  type?: boolean
  isFolder: boolean
}
export default function ListMenu({
  visible2,
  setVisible2,
  alternative,
  type,
  isFolder,
}: props) {
  const [visible3, setVisible3] = useState(false)
  const router = useRouter()
  const { id_one, setTitle } = useContext(context)
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)
  return (
    <div>
      <Popup
        visible={visible2}
        onMaskClick={() => {
          setVisible2(false)
        }}
        bodyStyle={{ minHeight: '34vh' }}>
        <div className="adm-action-sheet-button-list">
          <div>
            <a
              className="adm-action-sheet-button-item"
              onClick={() => {
                setVisible2(false)
                isFolder
                  ? router.push('/folder/' + id_one)
                  : router.push('/file/' + id_one)
                alternative(id_one)
              }}>
              <div className="adm-action-sheet-button-item-name">打开</div>
            </a>
          </div>
          <div>
            <a
              className="adm-action-sheet-button-item"
              onClick={async () => {
                setVisible2(false)
                Modal.show({
                  closeOnMaskClick: true,
                  showCloseButton: true,
                  content: (
                    <div>
                      <span className="rename_title">请输入文件名</span>
                      <input
                        placeholder="请输入文件名"
                        className="rename_input"
                        onChange={(e) => {
                          const value = e.target.value.trim()
                          e.target.value = value
                        }}
                        onKeyDown={(e) => {
                          const text = e.target.value.trim()
                          if (e.code === 'Enter') {
                            if (text !== '') {
                              axios
                                .post('/api/v1/file/update', {
                                  _id: id_one,
                                  title: text,
                                })
                                .then((res) => {
                                  console.log(res)
                                })
                              type ? alternative(id_one) : alternative()
                              e.target.value = ''
                            }
                          }
                        }}
                      />
                    </div>
                  ),
                  onClose() {
                    type ? alternative(id_one) : alternative()
                  },
                })
              }}>
              <div className="adm-action-sheet-button-item-name">重命名</div>
            </a>
          </div>
          <div>
            <a
              className="adm-action-sheet-button-item"
              onClick={async () => {
                setVisible2(false)
                if (!isFolder) {
                  setVisible3(true)
                  await axios
                    .post('/api/v1/share/create', {
                      _id: id_one,
                    })
                    .then((res) => {
                      console.log(res)
                      type ? alternative(id_one) : alternative()
                      setUrl(res.data.data)
                      setCopied(false)
                    })
                } else {
                  Toast.show({
                    content: '不能分享文件夹',
                    afterClose: () => {
                      console.log('after')
                    },
                  })
                }
              }}>
              <div className="adm-action-sheet-button-item-name">分享</div>
            </a>
          </div>
          <div>
            <a
              className="adm-action-sheet-button-item"
              onClick={() => {
                setVisible2(false)
                axios
                  .post('/api/v1/share/removenote', {
                    noteId: id_one,
                  })
                  .then((res) => {
                    console.log(res)
                  })

                axios
                  .post('/api/v1/file/remove', {
                    _id: id_one,
                  })
                  .then((res) => {
                    console.log(res)
                    type ? alternative(id_one) : alternative()
                    if (res.data.code === 10001) {
                      Toast.show({
                        content: res.data.message,
                        afterClose: () => {
                          console.log('after')
                        },
                      })
                    }
                  })
              }}>
              <div className="adm-action-sheet-button-item-name">
                <span className="del">删除</span>
              </div>
            </a>
          </div>
          <div className="adm-action-sheet-button-cancel">
            <a
              className="adm-action-sheet-button-item-cancel"
              onClick={() => {
                setVisible2(false)
              }}>
              <div className="adm-action-sheet-button-item-name">取消 </div>
            </a>
          </div>
        </div>
        {/* 分享菜单 */}
        <Share
          url={url}
          visible3={visible3}
          setVisible3={setVisible3}
          setCopied={setCopied}
        />
      </Popup>
    </div>
  )
}
