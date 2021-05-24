import Layout from '@/layout/frontend/index'

// 咨讯管理 apply
export default {
  path: '/article',
  redirect: 'noRedirect',
  component: Layout,
  name: 'Article',
  meta: { title: '咨讯管理', icon: 'list' },
  children: [
    {
      path: 'apply',
      component: () => import('@/views/article/index.vue'),
      name: 'article',
      meta: { title: '咨讯管理', icon: 'list' }
    }
  ]
}
