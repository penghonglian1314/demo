import request from '@/utils/request'

export function queryUserInfo(params, url = '/lxy_mall/queryUserInfo.action') {
  return request({
    url: url,
    method: 'post',
    params: params
  })
}

export function deleteUserInfo(params, url) {
  return request({
    url: '/lxy_mall/updateUserInfomation.action',
    method: 'post',
    params: params
  })
}

export function updateUserInfomation(params, url) {
  return request({
    url: url,
    method: 'post',
    params: params
  })
}

export function getUserRole(params, url = '/role/queryRole.action') {
  return request({
    url: url,
    method: 'post',
    params: params
  })
}

export function addUser(params, url = '/lxy_mall/addUserAccount.action') {
  return request({
    url: url,
    method: 'post',
    params: params
  })
}

export function updateUserInfo(params, url = '/lxy_mall/updateUserInfo.action') {
  return request({
    url: url,
    method: 'post',
    params: params
  })
}

// export function addProjectUser(params, url) {
//   return request({
//     url: url,
//     method: 'post',
//     params: params
//   })
// }

// export function addAccount(params, url = '/jy_lottery/addAccount.action') {
//   return request({
//     url: url,
//     method: 'post',
//     params: params
//   })
// }
