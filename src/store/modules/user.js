import { login, getUserInfo, getDeltailInfo } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    SETTOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    REMOVETOKEN(state) {
      state.token = null
      removeToken()
    },
    SETUSERINFO(state, userInfo) {
      // state.userInfo = { ...userInfo }  // 浅拷贝
      state.userInfo = JSON.parse(JSON.stringify(userInfo)) // 深拷贝
    },
    REMOVEINFO(state) {
      state.userInfo = {}
    }
  },
  actions: {
  // 登录
    async login({ commit }, data) {
      try {
        const res = await login(data)
        console.log(res)
        commit('SETTOKEN', res)
      } catch (error) {
        console.log(error.message)
      }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      const result = await getDeltailInfo(res.userId)
      const userInfo = { ...res, ...result }
      commit('SETUSERINFO', userInfo)
      return res // 不推荐  返回到外面的值会影响仓库的值，赋值的时候要深拷贝
    }
  }
}
