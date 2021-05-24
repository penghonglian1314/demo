import request from '@/utils/request'

export const queryCoupon =
(params) => request({
  url: '/lxy_mall/queryMallCoupon.action',
  method: 'post',
  params: params
})

export const deleteCoupon =
(params) => {
  return request({
    url: '/lxy_mall/deleteMallCoupon.action',
    method: 'post',
    params: params
  })
}

export const addCoupon =
(params) => request({
  url: '/lxy_mall/addMallCoupon.action',
  method: 'post',
  params: params
})

export const updateCoupon =
(params) => request({
  url: '/lxy_mall/updateMallCoupon.action',
  method: 'post',
  params: params
})

