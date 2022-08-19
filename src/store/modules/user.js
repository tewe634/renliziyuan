import { login, getUserInfo } from '@/api/user'
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
      state.userInfo = userInfo
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
      commit('SETUSERINFO', res)
    }
  }
}
