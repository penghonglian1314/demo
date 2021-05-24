import request from '@/utils/request'

export function queryGoodsModels(params) {
  return request({
    url: '/lxy_mall/business/queryGoodsModels.action',
    method: 'post',
    params: params
  })
}

export function addGoodsModels(params) {
  return request({
    url: '/lxy_mall/addGoodsModels.action',
    method: 'post',
    params: params
  })
}

export function deleteGoodsModels(params) {
  return request({
    url: '/lxy_mall/deleteGoodsModels.action',
    method: 'post',
    params: params
  })
}

export function updateGoodsModels(params) {
  return request({
    url: '/lxy_mall/updateGoodsModels.action',
    method: 'post',
    params: params
  })
}

export function queryGoodsModelsPrice(params) {
  return request({
    url: '/lxy_mall/queryGoodsModelsPrice.action',
    method: 'post',
    params: params
  })
}

export function addGoodsModelsPrice(params) {
  return request({
    url: '/lxy_mall/addGoodsModelsPrice.action',
    method: 'post',
    params: params
  })
}

export function deleteGoodsModelsPrice(params) {
  return request({
    url: '/lxy_mall/deleteGoodsModelsPrice.action',
    method: 'post',
    params: params
  })
}

export function updateGoodsModelsPrice(params) {
  return request({
    url: '/lxy_mall/updateGoodsModelsPrice.action',
    method: 'post',
    params: params
  })
}

