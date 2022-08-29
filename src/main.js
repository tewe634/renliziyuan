import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
// 引入全局组件
import components from '@/components'
import '@/icons' // icon
import '@/permission' // permission control
import * as directives from '@/directives'
import * as filters from '@/filters'
import Print from 'vue-print-nb'
Vue.use(Print)
Vue.use(ElementUI)
Vue.use(components)
//  Object.keys遍历对象转为为数组，得到属性名
Object.keys(directives).forEach(ele => {
// 注册全局自定义指令
  Vue.directive(ele, directives[ele])
})
Object.keys(filters).forEach(ele => {
// 注册全局过滤器
  Vue.filter(ele, filters[ele])
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
