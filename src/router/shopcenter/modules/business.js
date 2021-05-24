import Layout from '@/layout/frontend/index'

// 商户管理 business
export default {
  path: '/business',
  redirect: 'noRedirect',
  component: Layout,
  name: 'business',
  alwaysShow: true,
  meta: { title: '商户管理', icon: 'edit' },
  children: [
    {
      path: 'business',
      component: () => import('@/views/business/index'),
      name: 'business',
      alwaysShow: true,
      meta: { title: '商户管理', icon: '' }
    },
    {
      path: 'todetails.html',
      component: () => import('@/views/business/child-vue/details'),
      name: 'todetails',
      hidden: true,
      meta: { title: '商户信息', icon: '' }
    },
    // {
    //   path: 'todetails_shop.html',
    //   component: () => import('@/views/business/child-vue/details_shop'),
    //   name: 'todetails_shop',
    //   hidden: true,
    //   meta: { title: '商店信息', icon: '' }
    // },
    {
      path: 'apply',
      component: () => import('@/views/apply/index'),
      name: 'apply',
      meta: { title: '审核管理', icon: '' }
    }
    // {
    //   path: 'auditMember',
    //   component: () => import('@/views/apply/auditMember'),
    //   name: 'auditMember',
    //   meta: { title: '会员申请管理', icon: 'nested' }
    // }
  ]
}
