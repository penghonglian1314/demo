import Layout from '@/layout/frontend/index'

// 会员管理 member
export default {
  path: '/memberCoupon',
  redirect: 'noRedirect',
  component: Layout,
  name: 'memberCoupon',
  meta: { title: '用户优惠券管理', icon: 'table' },
  children: [
    {
      path: 'memberCoupon',
      component: () => import('@/views/memberCoupon/index.vue'),
      name: 'memberCoupon',
      meta: { title: '用户优惠券管理', icon: '' }
    }
  ]
}
