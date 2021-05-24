import {
  loginByUsername as login, logout, getUserInfo, getPermissions
} from '@/api/usercenter/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { Message } from 'element-ui'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  user: '',
  status: '',
  userType: '',
  code: '',
  setting: {
    articlePlatform: []
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    name === '' || name === null ? localStorage.removeItem('name') : localStorage.setItem('name', JSON.stringify(name))
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    roles === null || roles.length === 0 ? localStorage.removeItem('roles') : localStorage.setItem('roles', JSON.stringify(roles))
    state.roles = roles
  },
  SET_USER_TYPE: (state, userType) => {
    userType === null || userType.length === 0 ? localStorage.removeItem('userType') : localStorage.setItem('userType', JSON.stringify(userType))
    state.userType = userType
  },
  SET_USER: (state, user) => {
    user === '' || user === null ? localStorage.removeItem('user') : localStorage.setItem('user', JSON.stringify(user))
    state.user = user
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(username.trim(), password).then(response => {
        const datas = response.data
        // console.log('datas: ', datas, datas.data === '')
        if (datas.code === '1010' || datas.code === '1006') {
          Message({
            message: '用户或密码错误!',
            type: 'error',
            duration: 3000
          })
          reject()
        }
        const data = response.data.data
        // let resultData = null
        // if (data === null) {
        //   Message({
        //     message: '登录失败，请检查用户名和密码!',
        //     type: 'error',
        //     duration: 3000
        //   })
        //   reject()
        // } else {
        //   // console.log('data: ', data)
        //   resultData = JSON.parse(data)
        //   // console.log('resultData: ', resultData)
        // }
        const resultData = JSON.parse(data)
        console.log('resultData: ', resultData)
        if (resultData.UserRoles !== '') { // 验证角色身份
          Message({
            message: '登录失败，身份验证失败!',
            type: 'error',
            duration: 3000
          })
          reject()
        }
        commit('SET_USER', resultData)
        commit('SET_ROLES', [resultData.UserRoles])
        commit('SET_USER_TYPE', resultData.UserType)
        commit('SET_NAME', resultData.UserName)
        commit('SET_TOKEN', resultData.LoginID)
        setToken(resultData.LoginID)
        resolve()
      }).catch(error => {
        // console.log(error)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token).then(response => {
        if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
          reject('error')
        }
        const data = response.data
        if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', data.roles)
        } else {
          reject('getInfo: roles must be a non-null array !')
        }
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        commit('SET_USERTYPE', data.UserType)
        commit('SET_INTRODUCTION', data.introduction)
        resolve(response)
      }).catch(error => {
        // console.log('getInfo catch')
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  frontLogout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  loadPermission({ commit, dispatch }) {
    // 异步方法, 将内部异步请求整成顺序执行
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async(resolve) => {
      const funs = await getPermissions().then(async({ data: { data }}) => {
        // funs数据示例：
        // [{"funcCode":null,"funcName":null,"funcUrl":"/usercenter/statistics","funcLevel":0,"funcLast":0,"funcType":0,"isService":0,"sTypeNum":0,"funcLevelNum":null,"buttonType":0,"icon":""}
        // console.log(data, typeof data, 'getPermissions data')
        let funcsData = []
        if (data === null || data === undefined) {
          // console.log('getPermissions return null')
          return funcsData
        } else {
          const tmpResult = JSON.parse(data)
          if (tmpResult === null || tmpResult === undefined) {
            // console.log('data: ', data)
            // console.log('getPermissions result error.')
          } else {
            funcsData = tmpResult.Records || []
          }
          return funcsData
        }
      })
      // console.log('data: ', funs)
      const accessedRoutes = await dispatch('permission/generateRoutes', funs, { root: true }) // 根据roles权限生成可访问的路由表
      // console.log(accessedRoutes, typeof accessedRoutes, 'accessedRoutes')
      resetRouter()
      router.addRoutes(accessedRoutes) // 动态添加可访问路由表
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
