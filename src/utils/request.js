import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: BASE_API.SERVER_IP,
  withCredentials: true, // send cookies when cross-domain requests
  crossDomain: true,
  timeout: 10000, // request timeout
  headers: { 'X-Requested-with': 'XMLHttpRequest' }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code === '9998') {
      Message({
        message: '登录超时，请重新登录!',
        type: 'error',
        duration: 10000
      })
      // debugger
      store.dispatch('user/frontLogout').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
      return Promise.reject('error')
    } else {
      if (res.code !== undefined && res.code !== '0000') {
        Message({
          title: '失败',
          message: res.msg,
          type: 'error',
          duration: 2000
        })
      }
    }
    return response
  },
  error => {
    // debugger
    // console.log(error)
    if (error.request.status === 401) {
      Message({
        message: '登录超时，请重新登录!',
        type: 'error',
        duration: 10000
      })
      store.dispatch('user/frontLogout').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
