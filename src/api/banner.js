import request from '@/utils/request'

export const queryBanner =
(params) => request({
  url: '/lxy_mall/queryMallBanner.action',
  method: 'post',
  params: params
})

export const deleteBanner =
(params) => {
  return request({
    url: '/lxy_mall/deleteMallBanner.action',
    method: 'post',
    params: params
  })
}

export const addBanner =
(params) => request({
  url: '/lxy_mall/addMallBanner.action',
  method: 'post',
  params: params
})
export const updateBanner =
(params) => request({
  url: '/lxy_mall/updateMallBanner.action',
  method: 'post',
  params: params
})

export const queryBannerType =
(params) => request({
  url: '/lxy_mall/queryMallBannerType.action',
  method: 'post',
  params: params
})

export const deleteBannerType =
(params) => {
  return request({
    url: '/lxy_mall/deleteMallBannerType.action',
    method: 'post',
    params: params
  })
}

export const addBannerType =
(params) => request({
  url: '/lxy_mall/addMallBannerType.action',
  method: 'post',
  params: params
})

export const updateBannerType =
(params) => request({
  url: '/lxy_mall/updateMallBannerType.action',
  method: 'post',
  params: params
})
