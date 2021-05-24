import request from '@/utils/request'

export const queryAccountType =
(params) => request({
  url: '/lxy_mall/queryMemberAccountType.action',
  method: 'post',
  params: params
})

export const deleteAccountType =
(params) => {
  return request({
    url: '/lxy_mall/deleteMemberAccountType.action',
    method: 'post',
    params: params
  })
}

export const addAccountType =
(params) => request({
  url: '/lxy_mall/addMemberAccountType.action',
  method: 'post',
  params: params
})

export const updateAccountType =
(params) => request({
  url: '/lxy_mall/updateMemberAccountType.action',
  method: 'post',
  params: params
})

