<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog send-money modal-dialog-centered">
      <div v-if="showSendingOptions" class="modal-content">
          <div class="modal-header px-4">
            <h5 class="modal-title">Send Money</h5>
            <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
              <span class="ed-x fs-5"></span>
            </a>
          </div>
          <div class="modal-body">
            <div class="px-2" style="height: 24rem">
              <div class="mb-4">
                <h3>How would you like to send money?</h3>
              </div>
              <div @click="sendBy.method = 'bank'" :class="sendBy.method === 'bank' ? 'selected-fund-method' : ''"  class="fund-option px-4 mb-4 d-flex py-3 align-items-center cursor-pointer">
                <div class="rounded-circle flex-shrink-0 bg-eden-mint d-inline-flex align-items-center me-4 justify-content-center">
                  <img src="~/assets/bank-transfer.svg">
                </div>
                <div>
                  <p class="mb-0 caption-2">Bank Transfer</p>
                  <p class="mb-0 body-1 text-black-50 fw-normal">Send money to any local bank account.</p>
                </div>
              </div>
              <div @click="sendBy.method = 'mobile'" :class="sendBy.method === 'mobile' ? 'selected-fund-method' : ''"  class="fund-option px-4 d-flex py-3 align-items-center cursor-pointer">
                <div class="rounded-circle flex-shrink-0 bg-eden-mint d-inline-flex align-items-center me-4 justify-content-center">
                  <img src="~/assets/mobile-money.svg">
                </div>
                <div>
                  <p class="mb-1 caption-2">Mobile Money Transfer</p>
                  <p class="mb-0 body-1 text-black-50 fw-normal">Send money via phone number</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer px-4 justify-content-end mb-3">
            <button :disabled="!sendBy.method" @click="showSendingOptions = !showSendingOptions; step = 2" type="button" class="btn btn-sm btn-jungle-green px-5">Next</button>
          </div>
        </div>
      <keep-alive>
        <SendByBank @back="showSendingOptions = true; step = 1"
                    v-if="!showSendingOptions && sendBy.method === 'bank' && step===2"
                    @success="form =  {...form, ...$event}; step = 3" />
      </keep-alive>
      <keep-alive>
        <SendByMobile @back="showSendingOptions = true; step = 1"
                    v-if="!showSendingOptions && sendBy.method === 'mobile' && step===2"
                    @success="form =  {...form, ...$event}; step = 3" />
      </keep-alive>
      <keep-alive>
        <SendMoneyDesc :details="sendBy.method" @back="step=2" v-if="step===3"  @success="form =  {...form, ...$event}; step = 4" />
      </keep-alive>
      <keep-alive>
        <ConfirmWithdrawal :info="{...form, method: sendBy.method}" @back="step = 3" v-if="step===4"  @success="step=5" />
      </keep-alive>
      <keep-alive>
        <PinModal :info="{...form, method: sendBy.method}" @back="step = 4" v-if="step===5"  @success="withdrawFund" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import SendByBank from '~/components/wallet/SendByBank'
import SendByMobile from '~/components/wallet/SendByMobile'
import SendMoneyDesc from '~/components/wallet/SendMoneyDesc'
import ConfirmWithdrawal from '~/components/wallet/ConfirmWithdrawal'
import PinModal from '~/components/PinModal'
export default {
  components: { PinModal, ConfirmWithdrawal, SendByMobile, SendByBank, SendMoneyDesc },
  data () {
    return {
      showSendingOptions: true,
      step:  1,
      sendBy: {
        method: ''
      },
      form: {
        account_name:"Dapo Eden",
        account_number:"23030303",
        amount:"2000",
        bank:1,
        bank_details: {name: 'Edens360'}
      }
    }
  },
  methods: {
    async withdrawFund() {
      try {
        let res = await this.$store.dispatch('wallet/withdraw', {
          ...this.form,
          category: 'Misc',
          description: this.form.description || 'Eden description'
        })

        this.close()

        let toast = new bootstrap.Toast(document.getElementById('liveToast'), {
          delay: 7000,
          animation: true,
        })
        this.$store.commit('auth/setStates', {toast: {show: true,
          data: {
            header: 'Withdrawal Success!',
            body: 'Funds on the way'
          }}})
        toast.show()
      }catch (e) {
        console.log({e})
      }
    },
    close() {
      let modal = bootstrap.Modal.getInstance(document.getElementById('withdraw-wallet'))
      modal.hide()
    }
  },
  mounted() {
    let modal = document.getElementById("withdraw-wallet")
    modal.addEventListener('hidden.bs.modal', () => {
      this.form = {}; this.step = 1
      this.showSendingOptions = true
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
