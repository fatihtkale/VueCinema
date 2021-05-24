import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    loggedIn: false,
    token: ""
  },
  mutations: {
    UPDATE_JWT (state, payload) {
      state.token = payload;
    },
    UPDATE_LOGGED_IN (state, payload) {
      state.loggedIn = payload;
    }
  },
  getters:{
    loggedIn (state){
      return state.loggedIn;
    }
  },
  actions: {
    userLogout({ commit }){
      commit('UPDATE_JWT', "")
      commit('UPDATE_LOGGED_IN', false)
    }
  },
  plugins: [createPersistedState()]
})
