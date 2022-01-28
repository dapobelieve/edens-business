import Vue from "vue"
export const state = () => ({
  bills: [],
})

export const mutations = {
  setStates(state, data) {
    Object.keys(data).map((key) => {
      Vue.set(state, key, data[key] )
    })
  }
}
export const actions = {
  async getBills({commit}) {
    let res = await this.$axios.$get('/bills')
    if(res.code === 200){
      commit("setStates", {bills: res.bills}) }
}

}

export const getters = {
    billList: state => state.bills
}