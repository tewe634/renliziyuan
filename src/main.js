import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import * as directives from '@/directives'
Vue.use(ElementUI)
//  Object.keys遍历对象转为为数组，得到属性名
Object.keys(directives).forEach(ele => {
// 注册全局自定义指令
  Vue.directive(ele, directives[ele])
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
