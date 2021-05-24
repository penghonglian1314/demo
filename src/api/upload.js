import request from '@/utils/request'
// import requests from '@/utils/requests'
// import * as qiniu from 'qiniu-js'

export const getFileServerToken =
(params) => request({
  url: '/lxy_mall/getFileServerToken.action',
  method: 'post',
  params: params
})
