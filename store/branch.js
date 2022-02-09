import Vue from "vue"
export const state = () => ({
  branches: [],
})

export const mutations = {
  setStates(state, data) {
    Object.keys(data).map((key) => {
      Vue.set(state, key, data[key] )
    })
  }
}
export const actions = {
    async getBranches({commit}, ref) {
        let res = await this.$axios.$get(`/business/${ref}/branches`)
        if(res.code === 200){
        commit("setStates", {branches: res.business_branches}) 
        }
    },

    async createBranch({commit}, payload) {
    let res = await this.$axios.$post('/business/branch', {...payload})
    return res
    }

}

export const getters = {
    branchList: state => state.branches
}