import request from '@/utils/request'

export function queryTabBusiness(params) {
  return request({
    url: '/lxy_mall/queryTabBusiness.action',
    method: 'post',
    params: params
  })
}

export function addTabBusiness(params) {
  return request({
    url: '/lxy_mall/addTabBusiness.action',
    method: 'post',
    params: params
  })
}

export function deleteTabBusiness(params) {
  return request({
    url: '/lxy_mall/deleteTabBusiness.action',
    method: 'post',
    params: params
  })
}

export function updateTabBusiness(params) {
  return request({
    url: '/lxy_mall/updateTabBusiness.action',
    method: 'post',
    params: params
  })
}

export function deleteFile(params) {
  return request({
    url: '/lxy_mall/deleteFile.action',
    method: 'post',
    params: params
  })
}

export function queryTrees(params) {
  return request({
    url: '/lxy_mall/queryTrees.action',
    method: 'post',
    params: params
  })
}

export function QueryTabShop(params) {
  return request({
    url: '/lxy_mall/QueryTabShop.action',
    method: 'post',
    params: params
  })
}

export function addTabShop(params) {
  return request({
    url: '/lxy_mall/addTabShop.action',
    method: 'post',
    params: params
  })
}

export function updateUserInfomation(params) {
  return request({
    url: '/lxy_mall/updateUserInfomation.action',
    method: 'post',
    params: params
  })
}
