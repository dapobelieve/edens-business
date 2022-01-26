<template>
  <div>
    <template>
      <div class="card">
        <div class="card-body" style="padding: 2.25rem; padding-top: 2.125rem">
          <div class="d-xl-flex">
            <div class="d-none d-xl-inline-flex mt-2">
              <img height="24px" src="~assets/loan.svg" class="me-3">
              <h5>Loans</h5>
            </div>
            <div class="ms-auto">
              <TabComponent v-model="activeTab" :tabItems="tabs">
                <div v-for="(tab, tabIndex) in tabs" :slot="`tab-head-${tab}`" :key="tabIndex">{{tab}}</div>
              </TabComponent>
            </div>
          </div>
          <template v-if="activeTab === 'Current Loan'">
            <template  v-if="currentLoan && Object.entries(currentLoan.loan).length > 0" >
              <keep-alive>
                <CurrentLoanComponent :loan="currentLoan"  />
              </keep-alive>
            </template>
            <template v-else>
              <div class="card border-0">
                <div class="card-body d-flex flex-column" style="padding: 2.25rem; padding-top: 2.125rem">
                  <img class="mb-3" style="height: 4.4rem" src="~/assets/no-loan.svg">
                  <div class="text-center mb-5">
                    <h4 class="mb-3">Nothing to see here</h4>
                    <p class="text-black-50">You currently do not have any <br> active loan.</p>
                    <a @click.prevent="requestLoan()" class="d-inline-flex align-items-center fw-bold cursor-pointer">
                      <span class="bold-1 text-eden-green">Request for a loan</span> <span class="ed-chevron-right fs-4 text-eden-mint ms-2"></span>
                    </a>
                  </div>
                </div>
              </div>
            </template>
          </template>
         <keep-alive>
           <CompletedLoanComponent :loans-obj="loansObj" v-if="activeTab === 'Loan History'" />
         </keep-alive>
        </div>
      </div>
    </template>

    <div data-bs-toggle="modal" data-bs-target="#cannotRequestModal" class="d-xl-none request-loan position-fixed bg-jungle-green rounded-circle d-inline-flex align-items-center justify-content-center shadow-lg">
      <span class="ed-plus text-eden-mint fs-1"></span>
    </div>
  </div>
</template>
<script>
import Loader from '~/components/Loader'
import EdenButton from '~/components/EdenButton'
import { mapGetters } from 'vuex'
export default {
  components: { EdenButton, Loader },
  data () {
    return {
      user: null,
      tabs: ["Current Loan", "Loan History"],
      activeTab: "Current Loan",
      loansObj: null,
      toast: null,
    }
  },
  methods: {
    requestLoan() {
      let modal
      // if(this.verified) {
        modal = bootstrap.Modal.getInstance(document.getElementById('loanModal'))

      // }else {
      //   modal = bootstrap.Modal.getInstance(document.getElementById('cannotRequestModal'))
      // }
      modal.show()
    },
  },
  computed: {
    ...mapGetters({
      verified: 'auth/isVerified',
      currentLoan: 'loan/currentLoan'
    })
  },
  async beforeMount() {
    this.user = Object.assign({}, this.$store.state.auth.user)
    try {
      this.loansObj = await this.$store.dispatch('loan/getAllLoans')
    }catch (e) {
      console.log(e)
    }
  }
}
</script>
<style lang="scss" scoped>
.progress-label {
  background-color: rgba(0, 32, 38, 0.02);
}
.request-loan {
  height: 3.125rem;
  width: 3.125rem;
  bottom: 5rem;
  right: 1rem
}
</style>
