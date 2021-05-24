import Layout from '@/layout/frontend/index'

// 树
export default {
  path: '/tree',
  redirect: 'noRedirect',
  component: Layout,
  name: 'tree',
  meta: { title: '项目配置', icon: 'tree' },
  alwaysShow: true,
  children: [
    // {
    //   path: '/tree0',
    //   component: () => import('@/views/tree/tree_template0'),
    //   name: 'tree',
    //   meta: { title: '参数配置', icon: 'nested' }

    // },
    // {
    //   path: '/tree1',
    //   component: () => import('@/views/tree/tree_template1'),
    //   name: 'tree',
    //   meta: { title: '品牌分类', icon: 'nested' }

    // },
    // {
    //   path: '/tree2',
    //   component: () => import('@/views/tree/tree_template2'),
    //   name: 'tree',
    //   meta: { title: '商品分类', icon: 'nested' }

    // },
    // {
    //   path: '/tree3',
    //   component: () => import('@/views/tree/tree_template3'),
    //   name: 'tree',
    //   meta: { title: '车辆检测', icon: 'nested' }

    // },
    {
      path: '/tree4',
      component: () => import('@/views/tree/banner'),
      name: 'tree',
      meta: { title: 'Banner配置', icon: '' }
    }
  ]
}

// export default {
//   path: '/tree',
//   redirect: 'noRedirect',
//   component: Layout,
//   name: '树',
//   meta: { title: '树', icon: 'list' },
//   children: [
//     {
//       path: '/tree',
//       component: () => import('@/views/tree/tree_template'),
//       name: 'tree',
//       meta: { title: '参数配置', icon: 'nested' }
//     }
//   ]
// }
