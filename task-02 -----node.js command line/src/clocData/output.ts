import { TypesLanguage } from './languageData'
const [one, two, three, four, five] = [20, 15, 15, 15, 15] // 打印格式规范字符数
function output(items: TypesLanguage[]) {
  let [sum1, sum2, sum3, sum4] = [0, 0, 0, 0]
  let [text_one, text_two, text_three, text_four, text_five] = ['Language', 'files', 'blank', 'comment', 'code']
  console.log('--------------------------------------------------------------------------------')
  text_one = text_one.padEnd(one, ' ')
  text_two = text_two.padStart(two, ' ')
  text_three = text_three.padStart(three, ' ')
  text_four = text_four.padStart(four, ' ')
  text_five = text_five.padStart(five, ' ')
  console.log(text_one + text_two + text_three + text_four + text_five)
  console.log('--------------------------------------------------------------------------------')
  items.forEach((item) => {
    sum1 += item.files
    sum2 += item.blank
    sum3 += item.comment
    sum4 += item.code
    let files = String(item.files)
    files = files.padStart(two, ' ')
    let blank = String(item.blank)
    blank = blank.padStart(three, ' ')
    let comment = String(item.comment)
    comment = comment.padStart(four, ' ')
    let code = String(item.code)
    code = code.padStart(five, ' ')
    let name = item.name.padEnd(one, ' ')
    console.log(name + files + blank + comment + code)
  })
  console.log('--------------------------------------------------------------------------------')
  let sum11 = String(sum1)
  sum11 = sum11.padStart(two, ' ')
  let sum21 = String(sum2)
  sum21 = sum21.padStart(three, ' ')
  let sum31 = String(sum3)
  sum31 = sum31.padStart(four, ' ')
  let sum41 = String(sum4)
  sum41 = sum41.padStart(five, ' ')
  let sum0 = 'SUM'
  sum0 = sum0.padEnd(one, ' ')
  console.log(sum0 + sum11 + sum21 + sum31 + sum41)
  console.log('--------------------------------------------------------------------------------')
}

export default output
