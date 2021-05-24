/* 获取当前时间 hh-hh-hh-hh-hh-hh格式*/
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + '-' + [hour, minute, second].map(formatNumber).join('-')
}

/* 获取当前时间 hh-hh-hh hh：hh：hh格式*/
const formatTimed = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/* 获取当前时间 hhhhhhhhhhhh格式*/
const formatTimes = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('') + '' + [hour, minute, second].map(formatNumber).join('')
}
/* 获取当前时间 hhhhhhhh格式*/
const formatTime_date = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('') + ''
}
/* 获取当前时间 hhhhhhhh格式*/
const formatTime_min = dt => {
  const year = dt.substring(0, 4)
  const month = dt.substring(4, 6)
  const day = dt.substring(6, 8)
  const hour = dt.substring(8, 10)
  const minute = dt.substring(10, 12)
  const second = dt.substring(12, 14)
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 获取当前月份向前推一年的月份数组
const formatTime_monthlist = d => {
  var result = []
  result.push(d.getFullYear() + '年' + ((d.getMonth() + 1) < 10 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1)) + '月')
  for (var i = 0; i < 12; i++) {
    d.setMonth(d.getMonth() - 1)
    var m = d.getMonth() + 1
    m = m < 10 ? '0' + m : m
    // 在这里可以自定义输出的日期格式
    //					result.push(d.getFullYear() + "-" + m);
    result.push(d.getFullYear() + '年' + m + '月')
  }
  var up = result.reverse()
  // console.log(up.shift(), 'shuzu')
  return up
}
const formatTime_monthlist_number = d => {
  var result = []
  // result.push(d.getFullYear() + '' + (d.getMonth() + 1))
  result.push(d.getFullYear() + ((d.getMonth() + 1) < 10 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1)))

  for (var i = 0; i < 12; i++) {
    d.setMonth(d.getMonth() - 1)
    var m = d.getMonth() + 1
    m = m < 10 ? '0' + m : m + ''
    // 在这里可以自定义输出的日期格式
    //					result.push(d.getFullYear() + "-" + m);
    result.push(d.getFullYear() + m + '')
  }
  var up = result.reverse()
  // console.log(up.shift(), 'shuzu')
  return up
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
module.exports = {
  formatTime,
  formatTimed,
  formatTimes,
  formatTime_date,
  formatTime_min,
  formatTime_monthlist,
  formatTime_monthlist_number
}
