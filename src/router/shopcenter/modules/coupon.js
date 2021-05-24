import Layout from '@/layout/frontend/index'

// 会员管理 member
export default {
  path: '/coupon',
  redirect: 'noRedirect',
  component: Layout,
  name: 'coupon',
  meta: { title: '优惠券管理', icon: 'tab' },
  children: [
    {
      path: 'coupon',
      component: () => import('@/views/coupon/index.vue'),
      name: 'coupon',
      meta: { title: '优惠券管理', icon: '' }
    }
  ]
}
