import request from '@/utils/request'

export function queryThcTrade(params) {
  return request({
    url: '/lxy_mall/queryThcTrade.action',
    method: 'post',
    params: params
  })
}

export function addThcTrade(params) {
  return request({
    url: '/lxy_mall/addThcTrade.action',
    method: 'post',
    params: params
  })
}

export function deleteThcTrade(params) {
  return request({
    url: '/lxy_mall/deleteThcTrade.action',
    method: 'post',
    params: params
  })
}

export function updateThcTrade(params) {
  return request({
    url: '/lxy_mall/updateThcTrade.action',
    method: 'post',
    params: params
  })
}

// ///////////////////////
export function queryThcTradeGoods(params) {
  return request({
    url: '/lxy_mall/queryThcTradeGoods.action',
    method: 'post',
    params: params
  })
}

export function addThcTradeGoods(params) {
  return request({
    url: '/lxy_mall/addThcTradeGoods.action',
    method: 'post',
    params: params
  })
}

export function updateThcTradeGoods(params) {
  return request({
    url: '/lxy_mall/updateThcTradeGoods.action',
    method: 'post',
    params: params
  })
}

export function queryThcTradeAndGoods(params) {
  return request({
    url: '/lxy_mall/QueryTradeAndGoods.action',
    method: 'post',
    params: params
  })
}

export function queryThcTradeSumTotalPrice(params) {
  return request({
    url: '/lxy_mall/queryThcTradeSumTotalPrice.action',
    method: 'post',
    params: params
  })
}

// -----------
// 月份相关接口
// ----------
export function QueryThcTradeSumMonth(params) {
  return request({
    url: '/lxy_mall/queryThcTradeSumMonth.action',
    method: 'post',
    params: params
  })
}

export function QueryThcTradePriceSumMonth(params) {
  return request({
    url: '/lxy_mall/queryThcTradePriceSumMonth.action',
    method: 'post',
    params: params
  })
}

export function QueryMemberSumMonth(params) {
  return request({
    url: '/lxy_mall/queryMemberSumMonth.action',
    method: 'post',
    params: params
  })
}

export function QueryGoodsSumMonth(params) {
  return request({
    url: '/lxy_mall/queryGoodsSumMonth.action',
    method: 'post',
    params: params
  })
}

export function queryTradeGift(params) {
  return request({
    url: '/lxy_mall/queryTradeGift.action',
    method: 'post',
    params: params
  })
}
