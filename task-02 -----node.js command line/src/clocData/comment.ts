import languageType from './languageTypes'
let comment = 0
let control = false

//多行注释 "/*....*/"  "<!--...-->"
function multLine(line: string, types: string) {
  let htmlMark = ['<!--', '-->'] // html 符号 <!--
  let otherMark = ['/*', '*/'] // 其他大部分语言的符号
  let leng = 0 // 统计上面的符号长度
  let symbol: string[] = []
  if (types === 'HTML') {
    symbol = htmlMark // 作用是改变成 html的符号  （规则是一个，根据不同的符号统计）
    leng = 3
  } else {
    symbol = otherMark
    leng = 2
  }
  let newLine = line.trim()
  let length = newLine.length
  let start = newLine.indexOf(symbol[0])
  let end = newLine.indexOf(symbol[1])
  if (start === 0 && newLine.substring(length - leng, length) === symbol[1]) comment += 1 // /*.....*/
  if (start !== -1 && end === -1) {
    control = true // 看到 /* 改变开关
    if (start !== 0) {
      comment -= 1 // 如果 /* 前面有代码 则算代码，后面多统计进去了，所有这里减1
    }
  }
  if (end !== -1) {
    control = false // 发现 */ 开关关闭
    if (newLine.substring(length - leng, length) === symbol[1] && start !== 0) comment += 1 // 与第一种区分，防止统计两次
  }
  if (control === true) {
    comment += 1 // 如果 发现开关是 打开 的 后面的所有都叫注释
  }
}
// 单行注释 "//"
function aloneLine1(line: string, types: string) {
  let newLine = line.trim()
  if (newLine.substring(0, 2) === '//') comment += 1
}

// 判断 注释行数 空行数
function judge(line: string, types: string) {
  let languageComment = ''
  let blank = 0
  let newLine = line.trim()
  for (let item of languageType) {
    if (item.name === types) {
      languageComment = item.comment
    }
  }
  if (languageComment === 'double') {
    aloneLine1(line, types) // 多行注释 + 单行注释
    multLine(line, types)
  }
  if (languageComment === 'alone') {
    aloneLine1(line, types) // 单行注释
  }
  if (languageComment === 'mult') {
    multLine(line, types) //多行注释
  }
  if (newLine.length === 0) {
    if (control === false) blank += 1
  }
  let data = []
  data.push(comment, blank) // 把注释和空白返回出去
  comment = 0
  return data
}
export default judge
