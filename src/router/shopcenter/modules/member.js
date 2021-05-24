import Layout from '@/layout/frontend/index'

// 会员管理 member
export default {
  path: '/member',
  redirect: 'noRedirect',
  component: Layout,
  name: 'member',
  meta: { title: '会员管理', icon: 'peoples' },
  children: [
    {
      path: 'member',
      component: () => import('@/views/member/index.vue'),
      name: 'member',
      meta: { title: '会员管理', icon: '' }
    }, {
      path: 'member_detail.html',
      component: () => import('@/views/member/member_detail'),
      name: 'member_detail',
      hidden: true,
      meta: { title: '基础信息', icon: '' }
    }
    // {
    //   path: 'admin',
    //   component: () => import('@/views/member/admin.vue'),
    //   name: 'admin',
    //   meta: { title: '会员账号管理', icon: 'user' }
    // }
  ]
}
