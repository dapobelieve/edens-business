<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div v-if="showAccountUpgrade" class="modal-content">
        <div class="modal-header px-4">
          <h5 class="modal-title">Complete your company profile.</h5>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div class="modal-body mb-4">
          <div class="px-2" >
            <div class="d-flex mb-3 flex-column align-items-center">
              <div class="user-avatar mb-4 position-relative">
                <UserAvatar />
                <img class="position-absolute bottom-0 end-0" style="width: 35%" src="~/assets/images/tiers/0.svg">
              </div>
              <div class="text-center">
                <div class="d-flex flex-column mb-4">
                  <small class="caption-2 fw-bold">Your account is restricted</small>
                  <small class="caption-2 fw-bold">Please upgrade your account</small>
                </div>
                <div class="mb-2">
                  <span class="body-1 fw-light text-black-50">You are on <a class="text-eden-green text-decoration-underline fw-bold cursor-pointer">Tier 0</a>, you cannot perform any <br> transaction. please upgrade your account</span>
                </div>
                <div>
                  <nuxt-link to="wallet/transactions" class="cursor-pointer text-jungle-green body-1 fw-bold d-inline-flex align-items-center">Learn more <span class="text-eden-mint fs-6 ed-chevron-right"></span></nuxt-link>
                </div>

              </div>
            </div>
            <div class="border bank-details mb-3" style="border-radius: 16px">
              <div class="d-flex justify-content-start px-4 py-4">
                <p class="mb-0 caption text-black-50">Tier 1</p>
              </div>
              <div class="d-flex justify-content-between px-4 py-4">
                <p class="mb-0 caption-2 text-black">Daily transaction limit</p>
                <p class="mb-0 caption-2">$5000.00</p>
              </div>
              <div class="d-flex justify-content-between px-4 py-4">
                <p class="mb-0 caption-2 text-black">Maximum balance</p>
                <p class="mb-0 caption-2">$50,000.00</p>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 d-flex justify-content-center mb-5">
          <button @click.prevent="showAccountUpgrade=false; tier=1" type="button" class="btn btn-jungle-green px-5">Upgrade Now</button>
        </div>
      </div>
      <Tier1 v-if="!showAccountUpgrade && step === 1" @proceed="step = 2" />
      <CompanyDetails v-if="!showAccountUpgrade && step === 2" @proceed="step = 3" />
      <InviteDirector v-if="!showAccountUpgrade && step === 3" />
    </div>
  </div>
</template>

<script>
import FundByBank from '~/components/wallet/FundByBank'
import FundByCard from '~/components/wallet/FundByCard'
import Tier1 from '~/components/wallet/upgrade/Tier1'
import CompanyDetails from '~/components/wallet/upgrade/CompanyDetails'
import InviteDirector from '~/components/wallet/upgrade/InviteDirector'
export default {
  components: { Tier1, FundByCard, CompanyDetails, InviteDirector, FundByBank },
  data () {
    return {
      userData: {},
      step: 1,
      showAccountUpgrade: false,
      fund: {
        method: ''
      }
    }
  },
  methods: {
    close() {
      let modal = bootstrap.Modal.getInstance(document.getElementById('upgrade-modal'))
      modal.hide()
    }
  },
  mounted() {
    this.userData = Object.assign({}, this.$store.state.auth.user)
    let modal = document.getElementById("upgrade-modal")
    modal.addEventListener('hidden.bs.modal', () => {
      this.fund.method = null
      this.showFundingOptions = true
    })

    this.$once('hook:destroyed', () => {
      window.removeEventListener('hidden.bs.modal', ()=> {})
    })
  }
}
</script>

<style lang="scss" scoped>
::v-deep .user-avatar {
  div {
    div {
      height: 68px !important;
      width: 68px !important;
      font-size: 30px;
    }
  };
}
.bank-details {
  div:not(:last-child) {
    border-bottom: 1px solid rgba(0, 32, 38, 0.1);;
  }
}
.selected-fund-method {
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23002026' stroke-width='2' stroke-dasharray='13%2c 15%2c 12%2c 14' stroke-dashoffset='22' stroke-linecap='round'/%3e%3c/svg%3e");
}
</style>
