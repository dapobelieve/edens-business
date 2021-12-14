import Vue from "vue"
import Cookies from "js-cookie"
export const state = () => ({
  token:null,
  user: {
    "first_name": "Dapo",
    "last_name": "Believe",
    "email": "ddemodata@gmail.com",
    "phone_number": "00000000000",
    user_settings: {
      push_notification: false,
      sms_notification: true,
      email_notification: false,
    }
  },
  // user: null,
  config:null,
  toast: {},
  notifications: null
})

export const mutations = {
  setToken(state, token) {
    Vue.set(state, 'token', token)
  },
  setAuthUser(state, data) {
    Vue.set(state, 'user', data)
  },
  setStates(state, data) {
    Object.keys(data).map((key) => {
      Vue.set(state, key, data[key] )
    })
  }
}
export const actions = {
  async register({commit, state}, payload) {
    let res = await this.$axios.$post('auth/signup', {organization_id:1, ...payload})
    const {token} = res
    Cookies.set('x-access-token', token.token)
    return res
  },
  async login({commit,state}, payload) {
    let res = await this.$axios.$post('auth/login', {...payload})
    const {token, user} = res
    Cookies.set('x-access-token', token.token)
    commit("setAuthUser", { ...user, user_settings: {push_notification: false,
            sms_notification: true,
            email_notification: false,} })
    return res
  },
  async me({dispatch, commit}) {
    let res = await this.$axios.$get('/users/me');
    commit("setAuthUser", res.user)
    dispatch('configurations');
  },
  async update({commit, state},  payload) {
    let res = await this.$axios.$patch(`/users`, {...payload})
    commit('setAuthUser', payload)
  },
  async settings({dispatch, commit}, payload) {
    let res = await this.$axios.$patch('/users/settings',  {...payload})
    await dispatch("me")
  },
  async organizations({dispatch, commit}, payload) {
    let res =  await this.$axios.$get('internals/organizations?page=1&perPage=100')
    return res.organizations
  },
  async configurations({commit}) {
    let res =  await this.$axios.$get('internals/loan_config');
    commit("setStates", { config: res.config })
  },
  async logout({ commit }) {
    commit('setAuthUser', null)
    commit('setToken', null)
    Cookies.remove('x-access-token');
  }
}
export const getters = {
  getUser: state => state.user,
  toast: state => state.toast,
  getConfig: state => state.config,
  isVerified: (state) => {
    return state.user.status === "VERIFIED"
  }
}
