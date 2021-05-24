import request from '@/utils/request'
/**
 *查询树信息
 * @param {} params
 */
export function queryTree(params) {
  return request({
    url: BASE_API.SERVER_IP + '/lxy_mall/queryTree.action',
    method: 'post',
    params: params
  })
}
/**
 * 插入节点
 * @param {*} params
 */
export function insertTreeData(params) {
  return request({
    url: BASE_API.SERVER_IP + '/lxy_mall/insertTreeData.action',
    method: 'post',
    params: params
  })
}
/**
 * 修改树节点
 * @param {} params
 */
export function updateTreeData(params) {
  return request({
    url: BASE_API.SERVER_IP + '/lxy_mall/updateTreeData.action',
    method: 'post',
    params: params
  })
}
/**
 * 删除树节点
 * @param {*} params
 */
export function deleteTreeData(params) {
  return request({
    url: BASE_API.SERVER_IP + '/lxy_mall/deleteTreeData.action',
    method: 'post',
    params: params
  })
}

/**
 * 树的节点信息
 * @param {} params
 */
export function queryTreeInfo(params) {
  return request({
    url: BASE_API.SERVER_IP + '/lxy_mall/queryTreeInfo.action',
    method: 'post',
    params: params
  })
}

export function deleteFile(params) {
  return request({
    url: BASE_API.SERVER_IP + '/lxy_mall/deleteFile.action',
    method: 'post',
    params: params
  })
}

