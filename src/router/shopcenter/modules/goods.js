import Layout from '@/layout/frontend/index'

// 商品管理
export default {
  path: '/goods',
  redirect: 'noRedirect',
  component: Layout,
  name: 'goods',
  meta: { title: '商品管理', icon: 'shopping' },
  children: [
    {
      path: 'goods_index.html',
      component: () => import('@/views/goods/index.vue'),
      name: 'goods',
      meta: { title: '商品管理', icon: '' }
    },
    {
      path: 'todetails_goods.html',
      component: () => import('@/views/goods/child-vue/details_goods'),
      name: 'todetails_goods',
      hidden: true,
      meta: { title: '基础信息', icon: '' }
    },
    {
      path: 'addgoods.html',
      component: () => import('@/views/goods/child-vue/toadd'),
      name: 'addgoods',
      hidden: true,
      meta: { title: '添加页面', icon: '' }
    },
    {
      path: 'toaddExtension.html',
      component: () => import('@/views/goods/child-vue/toaddExtension'),
      name: 'toaddExtension',
      hidden: true,
      meta: { title: '添加页面', icon: '' }
    },
    {
      path: 'updategoods.html',
      component: () => import('@/views/goods/child-vue/toupdate'),
      name: 'updategoods',
      hidden: true,
      meta: { title: '修改页面', icon: '' }
    }
    // {
    //   path: 'goodsOfferRecord',
    //   component: () => import('@/views/goods/goodsOfferRecord/index.vue'),
    //   name: 'goodsOfferRecord',
    //   meta: { title: '商品竞价', icon: '' }
    // }
  ]
}
