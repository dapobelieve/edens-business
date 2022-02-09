import Vue from "vue"
export const state = () => ({
 members: [],
})

export const mutations = {
  setStates(state, data) {
    Object.keys(data).map((key) => {
      Vue.set(state, key, data[key] )
    })
  }
}
export const actions = {
    async getMembers({commit}, role, ref) {
        let res = await this.$axios.$get(`/business/members?business_role=${role}`)
        if(res.code === 200){
        commit("setStates", {members: res.members}) 
        }
    },

    async inviteMembers({commit}, payload) {
    let res = await this.$axios.$post('/business/invite', {...payload})
    return res
    }

}

export const getters = {
    businessMembers: state => state.members
}