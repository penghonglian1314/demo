import request from '@/utils/request'

export function queryTabBusinessApply(params) {
  return request({
    url: '/lxy_mall/queryTabBusinessApply.action',
    method: 'post',
    params: params
  })
}

export function addTabBusinessApply(params) {
  return request({
    url: '/lxy_mall/addTabBusinessApply.action',
    method: 'post',
    params: params
  })
}

export function deleteTabBusinessApply(params) {
  return request({
    url: '/lxy_mall/deleteTabBusinessApply.action',
    method: 'post',
    params: params
  })
}

export function updateTabBusinessApply(params) {
  return request({
    url: '/lxy_mall/updateTabBusinessApply.action',
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

export function addMallShopMember(params) {
  return request({
    url: '/lxy_mall/addMallShopMember.action',
    method: 'post',
    params: params
  })
}

export function updateMallShopMember(params) {
  return request({
    url: '/lxy_mall/updateMallShopMember.action',
    method: 'post',
    params: params
  })
}

export function deleteMallShopMember(params) {
  return request({
    url: '/lxy_mall/deleteMallShopMember.action',
    method: 'post',
    params: params
  })
}

export function QueryMallShopMember(params) {
  return request({
    url: '/lxy_mall/QueryMallShopMember.action',
    method: 'post',
    params: params
  })
}
