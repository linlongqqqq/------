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
  ErrUserNotFound: new ErrorStat(20001, '用户名错误', 404),
  ErrTaskNotEmpty: new ErrorStat(20002, '任务为空'),
  ErrTaskNotFound: new ErrorStat(20003, '找不到指定的任务', 404),
  ErrSessionNotFound: new ErrorStat(40001, '会话不存在'),
  ErrPassword: new ErrorStat(20004, '密码输入错误', 404),
  ErrRepeatUser: new ErrorStat(20005, '用户名重复', 404),
  ErrUserNotLogin: new ErrorStat(20006, '用户未登录', 404),
  ErrUserIsDisable: new ErrorStat(20007, '用户被禁用'),
}
