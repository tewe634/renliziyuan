import { login } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    SETTOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    REMOVETOKEN() {
      removeToken()
    }
  },
  actions: {
    async login({ commit }, data) {
      try {
        const res = await login(data)
        commit('SETTOKEN', res.data.data)
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
