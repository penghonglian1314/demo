import request from '@/utils/request'
// // import requests from '@/utils/requests'
// import { getFileServerToken } from './upload'

// export const getFileServerToken =
// (params) => request({
//   url: '/lxy_mall/getFileServerToken.action',
//   method: 'post',
//   params: params
// })

export const deleteFileServer = (params) => request({
  url: '/lxy_mall/deleteFileServerToken.action',
  method: 'post',
  params: params
})

