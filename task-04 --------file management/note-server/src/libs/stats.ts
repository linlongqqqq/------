/**
 * 统一JSON返回封装类
 */
export class JsonResp {
  code: number
  data?: any

  constructor(data?: any, code = 0) {
    this.data = data
    this.code = code
  }
}

/**
 * 错误状态
 */
export class ErrorStat extends JsonResp {
  message: string
  status: number

  constructor(code: number, message: string, status = 200) {
    super(undefined, code)
    this.message = message
    this.status = status
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
    }
  }
}

/**
 * 业务状态错误码
 */
export const stats = {
  ErrfolderIsnotEmpty: new ErrorStat(10001, '文件夹不为空'),
  ErrUserNotFound: new ErrorStat(20001, '用户名错误'),
  ErrTaskNotEmpty: new ErrorStat(20002, '任务为空'),
  ErrTaskNotFound: new ErrorStat(20003, '找不到指定的文件'),
  ErrSessionNotFound: new ErrorStat(40001, '会话不存在'),
  ErrPassword: new ErrorStat(20004, '密码输入错误'),
  ErrRepeatUser: new ErrorStat(20005, '用户名重复'),
  ErrUserNotLogin: new ErrorStat(20006, '用户未登录'),
  ErrUserIsDisable: new ErrorStat(20007, '用户被禁用'),
  ErrShareNotFound: new ErrorStat(20008, '找不到指定的分享'),
  ErrShareNotFolder: new ErrorStat(20009, '不能分享文件夹'),
  ErrDellNotFolder: new ErrorStat(20010, '不能删除文件夹'),
  ErrSharemany: new ErrorStat(20011, '不能多次分享'),
}
