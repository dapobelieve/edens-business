import Vue from "vue"

export const state = () => ({
  current: null,
  _current: {
    credit_score: {
      percent: 20,
      number_of_repayments: 5
    },
    loan: {
      interest: 12,
      percentage_paid: 14,
      next_payment_days_left: '42',
      reference: 'ED-23jkyzui',
      status: 'APPROVED',
      amount: 3000000,
      amount_left: 2000000,
      duration: 8
    }
  },
})

export const mutations = {
  setToken(state, token) {
    Vue.set(state, 'token', token)
  },
  setStates(state, data) {
    Object.keys(data).map((key) => {
      Vue.set(state, key, data[key] )
    })
  }
}
export const actions = {
  async loanRequest({commit}, payload) {
    let res = await this.$axios.$post('/loans',  {...payload, loan_type: 'Personal'})
    return res
  },
  async getAllLoans({commit}, payload) {
    return await this.$axios.$get('/loans')
  },
  async getSingleLoan({commit}, payload) {
    let res = await this.$axios.$get('/loans')
    console.log(res)
  },
  async getCurrentLoan({commit}, payload) {
    let res = await this.$axios.$get('/loan')
    commit("setStates", { current: res })
    return res
  }
}
export const getters = {
  currentLoan(state) {
    return state.current
  },
  hasCurrentLoan(state) {
    return Object.entries(state.current.loan).length === 0
  }
}
