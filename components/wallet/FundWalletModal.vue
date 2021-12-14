<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div v-if="showFundingOptions" class="modal-content">
        <div class="modal-header px-4">
          <h5 class="modal-title">Fund Wallet</h5>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div class="modal-body">
          <div class="px-2" style="height: 24rem">
            <div class="mb-4">
              <h3>How would you like to fund your wallet?</h3>
            </div>
            <div @click="fund.method = 'bank'" :class="fund.method === 'bank' ? 'selected-fund-method' : ''"  class="fund-option px-4 mb-4 d-flex py-3 align-items-center cursor-pointer">
              <div class="rounded-circle flex-shrink-0 bg-eden-mint d-inline-flex align-items-center me-4 justify-content-center">
                <img src="~/assets/bank-transfer.svg">
              </div>
              <div>
                <p class="mb-0 caption-2">Bank Transfer</p>
                <p class="mb-0 body-1 text-black-50 fw-normal">Fund by making a transfer to your unique Edens360 Bank Account.</p>
              </div>
            </div>
            <div @click="fund.method = 'card'" :class="fund.method === 'card' ? 'selected-fund-method' : ''"  class="fund-option px-4 d-flex py-3 align-items-center cursor-pointer">
              <div class="rounded-circle flex-shrink-0 bg-eden-mint d-inline-flex align-items-center me-4 justify-content-center">
                <img src="~/assets/fund-creditcard.svg">
              </div>
              <div>
                <p class="mb-1 caption-2">Debit Card</p>
                <p class="mb-0 body-1 text-black-50 fw-normal">Fund via a debit card; Mastercard, VISA.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer px-4 justify-content-between mb-3">
          <button data-bs-dismiss="modal" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
            <span class="ed-arrow-left text-eden-mint "></span>Back</button>
          <button :disabled="!fund.method" @click="showFundingOptions = !showFundingOptions" type="button" class="btn btn-sm btn-jungle-green px-5">Proceed</button>
        </div>
      </div>
      <FundByBank @back="showFundingOptions = true" v-if="!showFundingOptions && fund.method === 'bank'" />
      <FundByCard @close="close" @back="showFundingOptions = true" v-if="!showFundingOptions && fund.method === 'card'" />
    </div>
  </div>
</template>

<script>
import FundByBank from '~/components/wallet/FundByBank'
import FundByCard from '~/components/wallet/FundByCard'
export default {
  components: { FundByCard, FundByBank },
  data () {
    return {
      showFundingOptions: true,
      fund: {
        method: ''
      }
    }
  },
  methods: {
    close() {
      let modal = bootstrap.Modal.getInstance(document.getElementById('fund-wallet'))
      modal.hide()
    }
  },
  mounted() {
    let modal = document.getElementById("fund-wallet")
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
.fund-option {
  border-radius: 8px;
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%2392ccbf' stroke-width='2' stroke-dasharray='13%2c 15%2c 12%2c 14' stroke-dashoffset='22' stroke-linecap='round'/%3e%3c/svg%3e");
  transition: all 300ms ease-in;
  div:first-child {

    height: 44px;
    width: 44px;
  }
}
.selected-fund-method {
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23002026' stroke-width='2' stroke-dasharray='13%2c 15%2c 12%2c 14' stroke-dashoffset='22' stroke-linecap='round'/%3e%3c/svg%3e");
}
</style>
