import request from '@/utils/request'

export function queryMember(params) {
  return request({
    url: '/lxy_mall/queryMember.action',
    method: 'post',
    params: params
  })
}

export function addMember(params) {
  return request({
    url: '/lxy_mall/addMember.action',
    method: 'post',
    params: params
  })
}

export function deleteMember(params) {
  return request({
    url: '/lxy_mall/deleteMember.action',
    method: 'post',
    params: params
  })
}

export function updateMember(params) {
  return request({
    url: '/lxy_mall/updateMember.action',
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
