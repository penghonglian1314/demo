import request from '@/utils/request'

export const queryMemberCoupon =
(params) => request({
  url: '/lxy_mall/queryMallMemberCoupon.action',
  method: 'post',
  params: params
})

// export const deleteMemberCoupon =
// (params) => {
//   return request({
//     url: '/lxy_mall/deleteMallMemberCoupon.action',
//     method: 'post',
//     params: params
//   })
// }

// export const addMemberCoupon =
// (params) => request({
//   url: '/lxy_mall/addMallMemberCoupon.action',
//   method: 'post',
//   params: params
// })

// export const updateMemberCoupon =
// (params) => request({
//   url: '/lxy_mall/updateMallMemberCoupon.action',
//   method: 'post',
//   params: params
// })

