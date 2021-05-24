import request from '@/utils/request'

export function queryMallArticle(params) {
  return request({
    url: '/lxy_mall/queryMallArticle.action',
    method: 'post',
    params: params
  })
}

export function updateMallArticle(params) {
  return request({
    url: '/lxy_mall/updateMallArticle.action',
    method: 'post',
    params: params
  })
}

export function deleteMallArticle(params) {
  return request({
    url: '/lxy_mall/deleteMallArticle.action',
    method: 'post',
    params: params
  })
}

export function addMallArticle(params) {
  return request({
    url: '/lxy_mall/addMallArticle.action',
    method: 'post',
    params: params
  })
}

