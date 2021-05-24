import request from '@/utils/request'
// import { getToken } from '@/utils/auth'

// const prefix = 'usercenter'

export function loginByUsername(username, password, entCode, wayId, confirmOffline) {
  return request({
    url: '/lxy_mall/login.action',
    method: 'post',
    params: { 'UserID': username, 'Passwd': password, 'EntCode': entCode }
  })
}

export function logout() {
  return request({
    url: '/lxy_mall/logout.action',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/lxy_mall/info',
    method: 'get',
    params: { token }
  })
}

export function getPermissions(token, systemType, serverID) {
  return request({
    url: '/lxy_mall/userMenu.action',
    method: 'get',
    params: {
      SubServerID: systemType,
      ServerID: serverID
    }
  })
}
