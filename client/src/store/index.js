import { createStore } from 'vuex'

export default createStore({
  state: {
    loggedIn: Boolean
  },
  mutations: {
    UPDATE_JWT (state, payload) {
      localStorage.setItem('token', payload);
    },
    UPDATE_LOGGED_IN (state, payload) {
      state.loggedIn = payload;
    }
  },
  actions: {
    userLogout({ commit }){
      commit('UPDATE_JWT', "")
      commit('UPDATE_LOGGED_IN', false)
    }
  },
  modules: {
  }
})
