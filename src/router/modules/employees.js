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
  }
  ]
}
