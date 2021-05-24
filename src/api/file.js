import request from '@/utils/request'

export const uploadFile =
(params) => request({
  url: '/lxy_mall/uploadFile.action',
  method: 'post',
  params: params
})

export const downloadFile =
(params) => request({
  url: '/lxy_mall/file.action',
  method: 'post',
  params: params
})

export const deleteFile =
(params) => request({
  url: '/lxy_mall/deleteFile.action',
  method: 'post',
  params: params
})

export function saveFileContent(params, data) { // 不需要登录
  return request({
    url: '/lxy_mall/saveFileContent.action',
    method: 'post',
    headers: {
      'Content-Type': 'application/octet-stream' // 文件上传时的格式
    },
    params: params,
    data: data
  })
}
