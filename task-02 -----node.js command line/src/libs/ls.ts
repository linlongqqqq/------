import { ParsedArgs } from 'minimist'
import chalk from 'chalk'
import * as fs from 'fs'
import * as path from 'path'

/**
 * 枚举文件
 * @param args
 */
const [one, two, three] = [16, 14, 18]
interface Props {
  name: string
  isDirectory: boolean
  size: number
  mtime: number
}
// 名称排序
function orderName(items: Props[], rank: boolean, type: string) {
  // rank 代表正序还是倒序  type 代表要排序的类型 ：name/mtime
  let files = items.filter((item) => item.isDirectory === true) // 找到文件夹
  let file = items.filter((item) => item.isDirectory !== true) // 找到文件

  function sortBy() {
    return function (a: Props, b: Props) {
      if (type === 'name') {
        if (rank === true) {
          return a.name.charCodeAt(0) - b.name.charCodeAt(0)
        } else {
          return b.name.charCodeAt(0) - a.name.charCodeAt(0)
        }
      } else {
        if (rank === true) {
          return a.mtime - b.mtime
        } else {
          return b.mtime - a.mtime
        }
      }
    }
  }
  if (type === 'name') {
    files.sort(sortBy())
    file.sort(sortBy())
    items = files.concat(file) // 合并数组
  } else items.sort(sortBy())
  return items
}
//格式化时间
function formatTime(oldtime: number) {
  let time = new Date(Number(oldtime))
  let [time_min, time_hour] = [time.getMinutes(), time.getHours()]
  let [time_min2, time_hour2] = ['', '']
  if (time_min < 10) {
    time_min2 = '0' + time_min
  } else {
    time_min2 = String(time_min)
  }
  if (time_hour < 10) {
    time_hour2 = '0' + time_hour
  } else {
    time_hour2 = String(time_hour)
  }
  return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time_hour2}:${time_min2}`
}
//帮助
function help() {
  console.log('usage: ls <sort> <order>')
}

// ls 功能
function ls(dir: string, sort = 'name', order = 'asc') {
  const files = fs.readdirSync(dir) //读取当前文件目录
  let allFile = [] as Props[] //用来存放文件
  for (const file of files) {
    const fullpath = path.join(dir, file)
    const stat = fs.statSync(fullpath)
    const isDirectory = stat.isDirectory()
    const size = stat.size
    const mtime = stat.mtimeMs
    allFile.push({
      name: file,
      isDirectory: isDirectory,
      size: size,
      mtime: mtime,
    })
  }
  let [data, length, name, symbol] = ['LastWriteTime', 'Length', 'Name', '-']
  data = data.padEnd(one, ' ')
  length = length.padStart(two, ' ')
  name = name.padEnd(three, ' ')
  console.log(data + ' ' + length + ' ' + name)
  console.log(symbol.padEnd(one, '-') + ' ' + symbol.padStart(two, '-') + ' ' + symbol.padEnd(three, '-'))
  if (sort === undefined) {
    sort = 'name'
  }
  let isorder = true // 判断排序是正还是反
  if (order === 'desc') {
    isorder = false
  }
  allFile = orderName(allFile, isorder, sort)
  output(allFile)
}
//输出
function output(items: Props[]) {
  let name = ''
  items.forEach((item) => {
    let mtime = formatTime(item.mtime)
    mtime = String(mtime)
    mtime = mtime.padEnd(one, ' ')
    let size = String(item.size)
    if (size === '0') size = ' '
    size = size.padStart(two, ' ')
    if (item.isDirectory === true) {
      name = chalk.red.bgGreen(item.name)
    } else {
      name = item.name
    }
    name = name.padEnd(three, ' ')
    console.log(mtime + ' ' + size + ' ' + name)
  })
}
export default function (args: ParsedArgs) {
  const sort = args.sort
  const order = args.order
  if (args._.length !== 0) {
    return console.log(chalk.red('请正确输入，可选值 "--sort<name,mtime>","--order <asc,desc>"'))
  }
  if (args.help === true) return help()
  if (sort === undefined || sort === 'name' || sort === 'mtime') {
    if (order === 'asc' || order === 'desc' || order === undefined) {
      ls(process.cwd(), sort, order)
    } else {
      return console.log(chalk.red('order可选值只能是 "asc","desc"'))
    }
  } else {
    return console.log(chalk.red('sort可选值只能是 "name","mtime"'))
  }
}
