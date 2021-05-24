import { getToken } from '@/utils/auth'

const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token || getToken(),
  avatar: state => state.user.avatar,
  name: state => state.user.name === '' ? JSON.parse(localStorage.getItem('name')) : state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  user: state => state.user.user === '' || state.user.roles.length === null ? JSON.parse(window.localStorage.getItem('user')) : state.user.user,
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes
}
export default getters
