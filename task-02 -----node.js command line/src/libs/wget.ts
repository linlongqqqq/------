import { ParsedArgs } from 'minimist'
import axios from 'axios'
import ora from 'ora'
import chalk from 'chalk'
import { finished } from 'stream/promises'
import * as fs from 'fs'
import * as path from 'path'
/**
 * 文件下载
 * @param args
 */
async function download(oldurl: string, Flname = '') {
  let url = oldurl
  let fileName = ''
  // 请求下载地址，需要指定responseType为stream，让resp.data以可读流的形式返回
  try {
    const { headers, data } = await axios.get(url, {
      responseType: 'stream',
    })
    // 获取Content-Disposition
    // 获取下载文件的大小
    const size = Number(headers['content-length'])
    const content = headers['content-disposition']
    if (Flname !== '') {
      fileName = Flname
    } else if (content !== undefined) {
      fileName = content.split(';')[1].replace('filename=', '') //获取 content-disposition 里的文件名
      fileName = fileName.replace(/\"/g, '') //去掉引号
    } else {
      let n = url.indexOf('?')
      if (n !== -1) {
        url = url.substring(0, n)
      } else {
        fileName = path.basename(url) // 获取地址 url 里的文件名
      }
    }
    console.log('文件名:' + fileName)
    const name = fileName
    const stream = fs.createWriteStream(name)
    data.pipe(stream)
    console.log(`downloading ${name}...`)
    const spinner = ora('Loading unicorns').start() // 创建一个加载指示器
    spinner.color = 'green' // 指示器的颜色
    let [loaded, speed, tmp] = [0, '', 0] // 记录已经下载的数据长度
    let timeOld = Number(Date.now())
    data.on('data', (chunk: Buffer) => {
      let timeNew = Number(Date.now()) // 记录现在的时间按
      loaded += chunk.byteLength
      if (timeNew - timeOld >= 1000) {
        speed = ((loaded - tmp) / 1024 / 1024).toFixed(1)
        tmp = loaded
        timeOld = timeNew
      }
      const percent = ((loaded / size) * 100).toFixed(1) // 计算完成的百分比
      let lastTime = ((size - loaded) / 1024 / 1024 / Number(speed)).toFixed(1)
      spinner.text = `${percent}%   ${speed}Mb/s   剩余时间：${lastTime}s\n`
    })
    await finished(stream) // 等待写入流的结束，即下载完成
    // 修改指示器的状态
    spinner.stopAndPersist({
      symbol: chalk.green('√'),
    })
  } catch {
    console.log(chalk.red('error: 找不到此路径，请重新输入'))
  }
}
function help() {
  console.log('usage: wget <url>')
}
export default async function wget(args: ParsedArgs) {
  const url = args._[0]
  const name = args.o
  if (!url) return console.log(chalk.red('url required'))
  if (args.help === true) return help()
  if (name !== undefined) {
    await download(url, name)
  } else {
    await download(url)
  }
}
