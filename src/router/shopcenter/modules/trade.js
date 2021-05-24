import Layout from '@/layout/frontend/index'

// 订单管理 thc_trade_goods
export default {
  path: '/trade',
  redirect: 'noRedirect',
  component: Layout,
  name: 'trade',
  meta: { title: '订单管理', icon: 'form' },
  children: [
    {
      path: 'trade',
      component: () => import('@/views/trade/index.vue'),
      name: 'trade',
      meta: { title: '订单管理', icon: '' }
    },
    {
      path: 'trade_detail',
      component: () => import('@/views/trade/child-vue/detail.vue'),
      name: 'trade_detail',
      meta: { title: '订单详情', icon: '' },
      hidden: true
    },
    {
      path: 'trade_gift',
      component: () => import('@/views/trade/child-vue/gift.vue'),
      name: 'trade_gift',
      meta: { title: '赠品详情', icon: '' },
      hidden: true
    }
    // {
    //   path: 'trade_goods',
    //   component: () => import('@/views/trade_goods/index.vue'),
    //   name: 'trade_goods',
    //   meta: { title: '商品订单', icon: '' }
    // }
  ]
}
