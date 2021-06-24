import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用戶信息
    userInfo: {},
  },
  mutations: {
    // 保存用戶信息
    saveUserInfo(state, data) {
      state.userInfo = data
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
})
