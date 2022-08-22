import { TypesLanguage } from '../clocData/languageData'
import languageType from '../clocData/languageTypes'
import output from '../clocData/output'
import judge from '../clocData/comment'
import { ParsedArgs } from 'minimist'
import chalk from 'chalk'
import * as fs from 'fs'
import * as path from 'path'
import readline from 'readline' //引入 readline
let [oldTime, usefullfile, numCode] = [0, 0, 0] // 开始读文件的时间、有用的文件数量、总代码行数
let allfile: string[] = [] //所有文件   .length 就是所有文件数量
let language = {} //存放所有语言的信息
let [files, blank, comment, code, codeSum] = [0, 0, 0, 0, 0] // 记录每种文件的各种信息

// 排序函数
function orderSort(type: string, rank: boolean) {
  let temp: TypesLanguage[] = []
  for (let item in language) {
    temp.push(language[item])
  }
  function sortBy() {
    return function (a: TypesLanguage, b: TypesLanguage) {
      if (rank === true) {
        return a[type] - b[type]
      } else {
        return b[type] - a[type]
      }
    }
  }
  temp.sort(sortBy())
  return temp
}
// 判断是否是文件夹
function isDire(dir: string) {
  try {
    let stats = fs.statSync(dir)
    return stats.isDirectory()
  } catch (error) {
    console.log(chalk.red('"error":找不到该路径，请重新输入路径')) // 如果路径输入错误，则返回。
    return 'error'
  }
}
// 读取文件
function read(files: string) {
  let tmp = isDire(files)
  if (tmp === 'error') return 'error'
  if (tmp) {
    let dirs = fs.readdirSync(files)
    for (let dir of dirs) {
      dir = path.join(files, dir)
      read(dir)
    }
  } else {
    allfile.push(files)
    return
  }
}
// 主要功能实现
async function statistical(target: string) {
  oldTime = Number(Date.now())
  let types = ''
  let tmp = read(target) // 读文件
  if (tmp === 'error') return 'error'
  // 循环每一个文件
  for (const item of allfile) {
    let extname = path.extname(item)
    if (extname !== '' || extname !== undefined) {
      // 判断是否有扩展名
      extname = extname.substring(1) // 去掉 .
      //判断扩展名是否是已定义的
      for (let lang of languageType) {
        if (lang.type.includes(extname)) {
          types = lang.name
          usefullfile += 1
          files += 1
          const rl = readline.createInterface({
            input: fs.createReadStream(item),
          }) // 文件的每一行
          for await (const line of rl) {
            codeSum += 1 //代码总行数
            let data = []
            data = judge(line, types)
            comment += data[0]
            blank += data[1]
          }
          let chage = false // 判断 language 对象里面是否有这个对象 ，没有就加进去，有就和之前的数量相加
          for (let item in language) {
            if (item === types) chage = true
          }
          if (chage === false) {
            language[types] = {
              name: types,
              files: files,
              blank: blank,
              comment: comment,
              code: codeSum - comment - blank,
              codeSum: codeSum,
            }
          } else {
            language[types] = {
              name: types,
              files: language[types].files + files,
              blank: language[types].blank + blank,
              comment: language[types].comment + comment,
              code: language[types].code + (codeSum - comment - blank),
              codeSum: language[types].codeSum + codeSum,
            }
          }
          numCode += codeSum //总代码行数
          files = blank = comment = code = codeSum = 0
        }
      }
    }
  } // 循环 end
} // 函数体结束
// help 函数
function help() {
  console.log('usage:cloc target [options]')
}
// main 函数
export default async function cloc(args: ParsedArgs) {
  const sort = args.sort
  const order = args.order
  let target = args._[0]
  let list: TypesLanguage[] = [] //存放排序后的数据
  let isOrder = true // 判断是正序倒序
  if (args.help === true) return help()
  if (!target) return console.log(chalk.red('target required'))
  let tmp = await statistical(target) // 调用功能函数
  if (tmp === 'error') return // 路径错误 直接退出程序
  if (order === 'asc') isOrder = true
  if (order === 'desc') isOrder = false
  if (sort === undefined || sort === 'files' || sort === 'blank' || sort === 'comment' || sort === 'code') {
    if (order === 'asc' || order === 'desc' || order === undefined) {
      list = orderSort(sort, isOrder)
    } else return console.log(chalk.red('order可选值只能是 {"asc","desc"}'))
  } else return console.log(chalk.red('sort可选值只能是 {"files","blank","comment","code"}'))
  // 打印边框内容
  let time = (Number(Date.now()) - oldTime) / 1000 //总共用时 /秒
  console.log()
  console.log(allfile.length + ' files in total, ' + (allfile.length - usefullfile) + ' files ignored')
  console.log(
    'time=' + time.toFixed(2) + 's, ' + (allfile.length / time).toFixed(2) + 'files/s,  ' + (numCode / time).toFixed(2) + ' lines/s'
  )
  output(list) // 调用打印函数 打印表格内容
  ;(language = {}), (usefullfile = 0), (allfile = []), (oldTime = 0), (numCode = 0), (allfile = []) // 清空数据
}
