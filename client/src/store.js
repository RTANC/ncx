import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    signin (state, payload) {
      state.user = {
        id_token: payload.id_token,
        avatar: payload.avatar,
        fullname: payload.fullname,
        email: payload.email,
        access_token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFjaGVySWQiOjEsImRlcHRJZCI6MH0.JjsO07iBBARJOoCN6cBUgVk0DKvvMOYLl1MlccFYc3Q'
      }
    },
    signout (state) {
      state.user = null
    }
  },
  actions: {
    signin (context, payload) {
      context.commit('signin', payload)
    },
    signout (context) {
      context.commit('signout')
    }
  }
})
