import request from '@/utils/request'

export function QueryMallGoodsActivityType(params) {
  return request({
    url: '/lxy_mall/QueryMallGoodsActivityType.action',
    method: 'post',
    params: params
  })
}

export function addMallGoodsActivityType(params) {
  return request({
    url: '/lxy_mall/addMallGoodsActivityType.action',
    method: 'post',
    params: params
  })
}

export function updateMallGoodsActivityType(params) {
  return request({
    url: '/lxy_mall/updateMallGoodsActivityType.action',
    method: 'post',
    params: params
  })
}

export function deleteMallGoodsActivityType(params) {
  return request({
    url: '/lxy_mall/deleteMallGoodsActivityType.action',
    method: 'post',
    params: params
  })
}

export function QueryMallGoodsActivity(params) {
  return request({
    url: '/lxy_mall/QueryMallGoodsActivity.action',
    method: 'post',
    params: params
  })
}

export function addMallGoodsActivity(params) {
  return request({
    url: '/lxy_mall/addMallGoodsActivity.action',
    method: 'post',
    params: params
  })
}

export function deleteMallGoodsActivity(params) {
  return request({
    url: '/lxy_mall/deleteMallGoodsActivity.action',
    method: 'post',
    params: params
  })
}

export function updateMallGoodsActivity(params) {
  return request({
    url: '/lxy_mall/updateMallGoodsActivity.action',
    method: 'post',
    params: params
  })
}
