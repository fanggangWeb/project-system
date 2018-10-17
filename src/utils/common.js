// 时间处理
function timeHandle(hour) {
  let chineseNumbers = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
  let returnTime = {}
  let time = new Date(hour) // 取出传入值时间戳
  let year = time.getFullYear() // 取出年
  let month = time.getMonth() + 1 // 取出月
  let months = chineseNumbers[month - 1] + '月'
  let getDate = time.getDate() // 取出当前几号
  let day = new Date(year, month - 1, 1).getDay() // 取出当前月1号为星期几，0为星期天
  let lastMonth = new Date(year, month - 1, 0).getDate() // 取出上一月有多少天
  let numberDay = new Date(year, month, 0).getDate() // 取出当前月共有多少天
  let nextMonth = new Date(year, month, 1).getDay() // 取出下一月1号为星期几，0为星期天
  nextMonth = nextMonth === 0 ? 1 : 8 - nextMonth // 计算下一月有多少天展示到当前月
  returnTime.year = year
  returnTime.months = months
  returnTime.month = month
  returnTime.getDate = getDate
  returnTime.day = day
  returnTime.lastMonth = lastMonth
  returnTime.numberDay = numberDay
  returnTime.nextMonth = nextMonth
  return returnTime
}
// 气泡提示
function bubbleHints(lable, content, left) { // lable为需要展示的元素，content为报错内容
  // console.log(lable)
  let div = document.createElement('div')
  div.className = 'bubble-hints'
  div.innerHTML = content
  if (left) {
    div.style = 'left:' + left
  }
  let img = document.createElement('div')
  img.setAttribute('class', 'errorImg')
  div.appendChild(img)
  lable.style = 'position: relative;'
  lable.appendChild(div)
  let time
  time = setTimeout(function () {
    div.remove()
    clearTimeout(time)
  }, 3000)
}
// 下载
function download(data, name) { // url为文件路径，name为文件名字
  if (!data) {
    return
  }
  let a = document.createElement('a')
  a.href = data
  a.download = name
  document.body.appendChild(a)
  console.log(a)
  a.click()
  a.remove()
}
export default {
  timeHandle,
  bubbleHints,
  download
}
