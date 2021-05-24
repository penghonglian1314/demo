import request from '@/utils/request'

export function queryTabGoods(params) {
  return request({
    url: '/lxy_mall/queryTabGoods.action',
    method: 'post',
    params: params
  })
}

export function addTabGoods(params) {
  return request({
    url: '/lxy_mall/addTabGoods.action',
    method: 'post',
    params: params
  })
}

export function deleteTabGoods(params) {
  return request({
    url: '/lxy_mall/deleteTabGoods.action',
    method: 'post',
    params: params
  })
}

export function updateTabGoods(params) {
  return request({
    url: '/lxy_mall/updateTabGoods.action',
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

export function queryTabProductType(params) {
  return request({
    url: '/lxy_mall/queryTabProductType.action',
    method: 'post',
    params: params
  })
}

export function queryTabProductParam(params) {
  return request({
    url: '/lxy_mall/queryTabProductParam.action',
    method: 'post',
    params: params
  })
}

export function queryTabGoodsOfferRecord(params) {
  return request({
    url: '/lxy_mall/queryTabGoodsOfferRecord.action',
    method: 'post',
    params: params
  })
}

export function addTabGoodsOfferRecord(params) {
  return request({
    url: '/lxy_mall/addTabGoodsOfferRecord.action',
    method: 'post',
    params: params
  })
}

export function deleteTabGoodsOfferRecord(params) {
  return request({
    url: '/lxy_mall/deleteTabGoodsOfferRecord.action',
    method: 'post',
    params: params
  })
}

export function updateTabGoodsOfferRecord(params) {
  return request({
    url: '/lxy_mall/updateTabGoodsOfferRecord.action',
    method: 'post',
    params: params
  })
}

export function addTabGoodsExtension(params) {
  return request({
    url: '/lxy_mall/addTabGoodsExtension.action',
    method: 'post',
    params: params
  })
}

export function updateTabGoodsExtension(params) {
  return request({
    url: '/lxy_mall/updateTabGoodsExtension.action',
    method: 'post',
    params: params
  })
}

export function deleteTabGoodsExtension(params) {
  return request({
    url: '/lxy_mall/deleteTabGoodsExtension.action',
    method: 'post',
    params: params
  })
}

export function queryTabGoodsExtension(params) {
  return request({
    url: '/lxy_mall/queryTabGoodsExtension.action',
    method: 'post',
    params: params
  })
}
