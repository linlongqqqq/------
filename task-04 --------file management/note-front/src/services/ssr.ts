import { IFile, IUser } from '../libs/models'
import * as userService from './user'
import * as fileService from './file'
import * as fileRecentService from './recentFile'
import * as shareService from './share'
import * as noteService from './note'
import * as showService from './shareShow'

/**
 * 获取主页props
 */
export async function indexProps(cookie: any) {
  try {
    const { code, data, message } = await fileRecentService.listRecentFile(
      {},
      cookie
    )
    if (code === 0) {
      return {
        props: {
          items: data.files,
          total: data.total,
        },
      }
    }
    if (code === 20006) {
      return {
        props: {},
        redirect: {
          destination: '/login',
        },
      }
    }
    return {
      props: {
        error: message,
      },
    }
  } catch (error) {
    console.trace(error)
    return {
      props: {
        error: '服务器内部错误',
      },
    }
  }
}

/**
 * 获取文件列表页props
 */
export async function fileProps(cookie: any, pid?: string) {
  try {
    const { code, data, message } = await fileService.listfiles(
      { pid: pid },
      cookie
    )
    if (code === 0) {
      return {
        props: {
          items: data.files,
        },
      }
    }
    return {
      props: {
        error: message,
      },
    }
  } catch (error) {
    console.trace(error)
    return {
      props: {
        error: '服务器内部错误',
      },
    }
  }
}

/**
 * 获取分享页props
 */
export async function shareProps(cookie: any) {
  try {
    const { code, data, message } = await shareService.listShare({}, cookie)
    if (code === 0) {
      return {
        props: {
          items: data.files,
        },
      }
    }
    return {
      props: {
        error: message,
      },
    }
  } catch (error) {
    console.trace(error)
    return {
      props: {
        error: '服务器内部错误',
      },
    }
  }
}

export async function fileItem(cookie: any, _id: string) {
  try {
    const { code, data, message } = await noteService.getNote(_id, cookie)
    if (code === 0) {
      return {
        props: {
          ...data,
          _id,
        },
      }
    }
    return {
      props: {
        error: message,
      },
    }
  } catch (error) {
    console.trace(error)
    return {
      props: {
        error: '服务器内部错误',
      },
    }
  }
}
export async function shareShow(cookie: any, url: string) {
  try {
    const { code, data, message } = await showService.getShow(url, cookie)
    if (code === 0) {
      return {
        props: {
          ...data,
        },
      }
    }
    return {
      props: {
        error: message,
      },
    }
  } catch (error) {
    console.trace(error)
    return {
      props: {
        error: '服务器内部错误',
      },
    }
  }
}
export async function userGet(cookie: any) {
  try {
    const { code, data, message } = await userService.getUser(cookie)
    if (code === 0) {
      return {
        props: {
          ...data,
        },
      }
    }
    return {
      props: {
        error: message,
      },
    }
  } catch (error) {
    console.trace(error)
    return {
      props: {
        error: '服务器内部错误',
      },
    }
  }
}
