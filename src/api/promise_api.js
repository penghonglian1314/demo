import request from '@/utils/request'

export function queryMenuTree(params, url) {
  return request({
    url: '/lxy_mall/queryMenuTree.action',
    method: 'post',
    params: params
  })
}

export function PromiseRequest(url = '', params = {}, type = 'GET') {
  let promise
  return new Promise((resolve, reject) => {
    //  判断请求的方式
    // console.log(url, 'url')
    promise = request({ url: url, method: 'post', params: params })
    // console.log(promise)
    promise.then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
