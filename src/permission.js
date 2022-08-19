// 1. 权限拦截处理逻辑需要放在路由的前置守卫里处理
// 2. 首先判断有无token
// 2.1 token 存在 说明 处于登录状态
// 2.1.1 判断是否处于登录页面，是的话 跳首页 否则 直接留在当前页（直接放行 next()）
// 2.2 token 不存在 说明 不处于登录状态
// 2.2.1 判断一下 是否处于白名单 是的话 直接留在 当前页 否则 跳转到登录页
import router from '@/router'
import store from '@/store'
const whileList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  if (store.getters.token) { // 有token
    if (to.path === '/login') { // 去登入的话直接去首页，其他的话都可以
      next('/')
    } else {
      next()
    }
  } else {
    if (whileList.includes(to.path)) { // 没有token的话白名单的都可以去，其他的不可以
      next()
    } else {
      next('/login')
    }
  }
})
