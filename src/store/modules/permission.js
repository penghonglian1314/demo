import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes 需要判断权限的动态路由
 * @param icons 图标
 * @param funs 权限路由地址
 */
function filterAsyncRoutes(routes, icons, funs) {
  return routes.filter(route => {
    if (route.children && route.children.length > 1) {
      route.children = filterAsyncRoutes(route.children, icons, funs)
    }
    const hasFunc = funs && funs.length !== 0 && funs.indexOf(route.path) !== -1
    if (hasFunc && route.meta && route.meta.icon) {
      route.meta.icon = icons[funs.indexOf(route.path)] !== null && icons[funs.indexOf(route.path)] !== '' ? icons[funs.indexOf(route.path)] : route.meta.icon
    }
    return hasFunc
  })
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      accessedRoutes.push({ path: '/*', redirect: '/404', hidden: true })
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
