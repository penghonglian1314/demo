// export function formatTime(time){
//     const data = time.toString()
// }
// 年月日
export function formatYmd(ymd) {
  if (!ymd) { return '' }
  const date = ymd.toString()
  return date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2)
}

// 年月日时分
export function formatYmdhm(ymd) {
  if (!ymd) { return '' }
  const date = ymd.toString()
  return date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2) + ' ' + date.substr(8, 2) + ':' + date.substr(10, 2)
}

// 年月日时分秒
export function formatYmdhms(ymd) {
  if (!ymd) { return '' }
  const date = ymd.toString()
  return date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2) + ' ' + date.substr(8, 2) + ':' + date.substr(10, 2) + ':' + date.substr(12, 2)
}
