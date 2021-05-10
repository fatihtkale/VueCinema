import { createStore } from 'vuex'
import { axios } from 'axios'

export default createStore({
  state: {
    userToken: String,
    loggedIn: Boolean
  },
  mutations: {
    UPDATE_USER (state, payload) {
      state.userToken = payload;
    },
    UPDATE_LOGGED_IN (state, payload) {
      state.loggedIn = payload;
    }
  },
  actions: {
    userLogin({ commit }){
      axios.post('http://localhost:8080/login').then(response => {
        commit('UPDATE_USER', response.data.token)
        commit('UPDATE_LOGGED_IN', true)
      })
    },
    userLogout({ commit }){
      commit('UPDATE_USER', "")
      commit('UPDATE_LOGGED_IN', false)
    }
  },
  modules: {
  }
})
