import Vue from "vue"
export const state = () => ({
  balance: 0,
  account: {},
  transactions: [],
})

export const mutations = {
  setStates(state, data) {
    Object.keys(data).map((key) => {
      Vue.set(state, key, data[key] )
    })
  }
}
export const actions = {
  async requestMoney({dispatch}, payload) {
    return this.$axios.$post(`/request/link`, {
      amount: payload.amount,
      description: payload.description || 'request money'
    })
  },
  async withdraw({dispatch, commit}, payload) {
    let res = await this.$axios.$post('/wallet/withdraw', {...payload})
    if(res.code === 200){
      commit("setStates", {balance: res.wallet.balance})
      dispatch('getTransactions')
    }
    return res
  },
  async internalTransfer({dispatch, commit}, payload) {
    return await this.$axios.$post('/transfer/internal', {...payload})
  },
  async changePin() {
    //
  },
  async getCard({commit}) {
    return await this.$axios.$get('/cards')
  },
  async getWallet({commit}) {
    let res = await this.$axios.$get('/wallet')
    commit("setStates", {account: res.account, balance: res.account.balance, transactions: res.transactions, number: res.account.account_number})
  },
  async getTransactions({commit}) {
    let res = await this.$axios.$get('/transactions')
    commit("setStates", {transactions: res.transactions})
  },
  async fundWallet({dispatch, commit}, payload) {
    let res = await this.$axios.$post('/wallet/deposit', {
      ...payload,
      category: "Crypto",
      "description": "funds..."
    })

    commit("setStates", {balance: res.wallet.balance})
    dispatch('getTransactions')
  }
}

export const getters = {
  walletBalance: state => state.balance,
  walletTrxn: state => state.transactions,
  walletNumber: state => state.number,
  getAccount: state => state.account
}
