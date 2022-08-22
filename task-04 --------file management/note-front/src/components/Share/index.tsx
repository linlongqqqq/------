import { Button, Input, Popup } from 'antd-mobile'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import Image from 'next/image'
import { context } from '../../hooks/store'

interface props {
  url: string
  visible3: boolean
  setVisible3: React.Dispatch<React.SetStateAction<boolean>>
  setCopied: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Share({
  url,
  visible3,
  setVisible3,
  setCopied,
}: props) {
  const { title } = useContext(context)

  return (
    <div>
      <Popup
        visible={visible3}
        onMaskClick={() => {
          setVisible3(false)
        }}
        bodyStyle={{ minHeight: '35vh' }}>
        <div className="prop_share">
          <div className="prop_share_title">
            <Image src="/img/file.svg" alt="文件" width={30} height={30} />
            <span className="prop_share_title_span">{title}</span>
          </div>
          <Input
            type="text"
            readOnly
            className="prop_share_input"
            value={'http://localhost:4017/share/' + url}
            placeholder="1"
          />
          <CopyToClipboard
            text={'http://localhost:4017/share/' + url}
            onCopy={() => setCopied(true)}>
            <Button
              block
              color="primary"
              size="middle"
              className="prop_share_button button_copy_color">
              <span className="prop_share_button_span">复制连接</span>
            </Button>
          </CopyToClipboard>
          <Button
            block
            color="danger"
            size="middle"
            onClick={() => {
              axios
                .post('/api/v1/share/remove', {
                  url: url,
                })
                .then((res) => {
                  console.log(res)
                })
            }}>
            <span className="prop_share_button_span">取消分享</span>
          </Button>
        </div>
      </Popup>
    </div>
  )
}
