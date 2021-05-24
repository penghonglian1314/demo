import request from '@/utils/request'

export function queryMallGift(params) {
  return request({
    url: '/lxy_mall/queryMallGift.action',
    method: 'post',
    params: params
  })
}

export function addMallGift(params) {
  return request({
    url: '/lxy_mall/addMallGift.action',
    method: 'post',
    params: params
  })
}

export function deleteMallGift(params) {
  return request({
    url: '/lxy_mall/deleteMallGift.action',
    method: 'post',
    params: params
  })
}

export function updateMallGift(params) {
  return request({
    url: '/lxy_mall/updateMallGift.action',
    method: 'post',
    params: params
  })
}

export function queryMemberAccountType(params) {
  return request({
    url: '/lxy_mall/queryMemberAccountType.action',
    method: 'post',
    params: params
  })
}
