import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    loggedIn: false
  },
  mutations: {
    UPDATE_JWT (state, payload) {
      localStorage.setItem('token', payload);
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
