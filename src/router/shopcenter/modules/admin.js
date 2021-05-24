import Layout from '@/layout/frontend/index'

// 用户管理
export default {
  path: '/admin',
  redirect: 'noRedirect',
  component: Layout,
  name: 'admin',
  meta: { title: '商户管理', icon: '用户管理' },
  children: [
    {
      path: '/admin/project',
      component: () => import('@/views/staff/userManage/index.vue'),
      name: 'project',
      meta: { title: '账号管理', icon: '用户管理' }
    }
  ]
}
