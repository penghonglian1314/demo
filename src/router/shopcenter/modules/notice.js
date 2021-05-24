import Layout from '@/layout/frontend/index'

// 咨讯管理 apply
export default {
  path: '/notice',
  redirect: 'noRedirect',
  component: Layout,
  name: 'Notice',
  meta: { title: '公告管理', icon: 'list' },
  children: [
    {
      path: 'notice',
      component: () => import('@/views/notice/index.vue'),
      name: 'notice',
      meta: { title: '公告管理', icon: 'list' }
    }
  ]
}
