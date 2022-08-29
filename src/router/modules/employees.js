import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  children: [{
    path: '',
    name: 'employees',
    component: () => import('@/views/employees'),
    meta: { title: '员工', icon: 'people' }
  },
  {
    path: 'detail/:id',
    name: 'detail',
    component: () => import('@/views/employees/detail'),
    hidden: true,
    meta: { title: '员工详情' }
  },
  {
    path: 'print/:id',
    name: 'print',
    component: () => import('@/views/employees/print'),
    hidden: true,
    meta: {
      title: '打印', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
      icon: 'people'
    }
  }

  ]
}
