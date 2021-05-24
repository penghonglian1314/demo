import Layout from '@/layout/frontend/index'

// 会员管理 member
export default {
  path: '/activity',
  redirect: 'noRedirect',
  component: Layout,
  name: 'activity',
  meta: { title: '活动管理', icon: 'excel' },
  children: [
    {
      path: 'activity',
      component: () => import('@/views/activity/index.vue'),
      name: 'activity',
      meta: { title: '活动管理', icon: '' }
    }
  ]
}
