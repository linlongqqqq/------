import React from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { UnlockOutline, RightOutline } from 'antd-mobile-icons'
import MainLayout from '../../components/MainLayout'
import { Dialog } from 'antd-mobile'
import axios from 'axios'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { formatCookie } from '../../services/session'
import * as ssrService from '../../services/ssr'
import { IUser } from '../../libs/models'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const props = await ssrService.userGet(formatCookie(ctx.req.cookies))
  return props
}
export default function Me(props: IUser) {
  const router = useRouter()
  return (
    <MainLayout activeKey="/me">
      <div className={styles.me}>
        <main className={styles.main}>
          <div className={styles.warp}>
            <header className={styles.me_top}>
              <div className={styles.image}>
                <Image
                  src="/img/user.svg"
                  alt="user"
                  width={60}
                  height={60}></Image>
              </div>
              <span className={styles.nikname}>{props.nickname}</span>
            </header>
            <div className={styles.list}>
              <div className={styles.list_body}>
                <div className={styles.list_bodt_inner}>
                  <a className="adm-list-item adm-plain-anchor">
                    <div className={styles.adm_list_item_content}>
                      <div className={styles.adm_list_item_content_prefix}>
                        <UnlockOutline fontSize={19} />
                      </div>
                      <div
                        className={styles.adm_list_item_content_main}
                        onClick={() => {
                          router.push('/repass')
                        }}>
                        修改密码
                      </div>
                      <div className={styles.adm_list_item_content_arrow}>
                        <RightOutline
                          fontSize={19}
                          color="var(--adm-color-weak)"
                        />
                      </div>
                    </div>
                  </a>
                  <a className="adm-list-item adm-plain-anchor">
                    <div className={styles.adm_list_item_content}>
                      <div className={styles.adm_list_item_content_prefix}>
                        <Image
                          src="/img/exit.svg"
                          alt="exit"
                          width={16}
                          height={16}></Image>
                      </div>
                      <div
                        className={styles.adm_list_item_content_main}
                        onClick={async () => {
                          const result = await Dialog.confirm({
                            content: '确定要退出登陆吗？',
                          })
                          if (result) {
                            axios.get('/api/v1/user/layout').then((res) => {
                              console.log(res)
                              if (res.status === 200) {
                                router.push('/login')
                              }
                            })
                          }
                        }}>
                        退出登录
                      </div>
                      <div className={styles.adm_list_item_content_arrow}>
                        <RightOutline
                          fontSize={19}
                          color="var(--adm-color-weak)"
                        />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  )
}
