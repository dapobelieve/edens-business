<template>
    <div class="modal-content border-0">
        <div class="modal-header px-4">
            <h5 class="modal-title">Loan type</h5>
            <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
            </a>
        </div>
        <div class="modal-body" style="height: 26rem">
            <div class="flex-grow-1 px-3">
                <h3 class="mb-4 fs-4">Is this an organization or a personal <br /> loan?</h3>
                <div class="mt-2 fund-option px-4 mb-4 d-flex py-3 align-items-center cursor-pointer text-opacity-25">
                        <div class="rounded-circle flex-shrink-0 bg-mint-lighter d-inline-flex align-items-center me-4 justify-content-center">
                            <img src="~/assets/personal.svg">
                        </div>
                        <div>
                            <p class="mb-0 fw-bolder">Personal Loan</p>
                            <p class="mb-0 body-1 text-black-50">I’m an responsible for the payment of this loan</p>
                        </div>
                </div>

                <div class="mt-2 fund-option px-4 mb-4 d-flex py-3 align-items-center cursor-pointer">
                        <div class="rounded-circle flex-shrink-0 bg-mint-lighter d-inline-flex align-items-center me-4 justify-content-center">
                            <img src="~/assets/organization.svg">
                        </div>
                        <div>
                            <p class="mb-0 fw-bolder">Organization Loan</p>
                            <p class="mb-0 body-1 text-black-50">My organization is responsible for the payment of this loan</p>
                        </div>
                </div>
            </div>
        </div>
        <div class="modal-footer ms-0 px-4 mb-3">
          <button @click="next" type="button" class="btn btn-sm btn-jungle-green px-6">
            <span>Next</span>
          </button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    }
  },
  methods: {
    next() {
      this.$emit("loan-proceed", {...this.form})
    }
  }
}
// import { mapState, mapGetters } from "vuex"
// import Indicator from '~/components/Indicator'
// import SetAmount from '~/components/loans/SetAmount'
// import SetDuration from '~/components/loans/SetDuration'
// import Loader from '~/components/Loader'
// import EdenButton from '~/components/EdenButton'
// export default {
//   components: { EdenButton, Loader, SetDuration, SetAmount, Indicator },
//   data () {
//     return {
//       step: 1,
//       form: {
//       },
//       error: null,
//       btn: {
//         text: 'Next',
//         loading: false
//       }
//     }
//   },
//   methods: {
//     async submit() {
//       this.btn.text= 'Processing...';
//       this.btn.loading = true
//       try {
//         let res = await this.$store.dispatch('loan/loanRequest', {...this.form})
//         this.$emit('loan-success')
//         let toast = new bootstrap.Toast(document.getElementById('liveToast'), {
//           delay: 7000,
//           animation: true,
//         })
//         this.$store.commit('auth/setStates', {toast: {show: true,
//             data: {
//               header: 'Loan request sent!',
//               body: 'Your loan request has been sent to your organization HR for approval.'
//             }}})
//         toast.show()
//       }catch (e) {
//         this.error = e.message
//       }finally {
//         this.btn.text= 'Next';
//         this.btn.loading = false
//       }
//     },
//     close() {
//       let modal = bootstrap.Modal.getInstance(document.getElementById('loanModal'))
//       modal.hide()
//     }
//   },
//   computed: {
//     ...mapGetters({
//       config: "auth/getConfig"
//     }),
//     formatAmount() {
//       return new Intl.NumberFormat('en-US').format(parseFloat(this.form.amount))
//     },
//     paybackAmount() {
//       return new Intl.NumberFormat('en-US').format(parseFloat(this.form.amount/this.form.duration))
//     }
//   },
//   mounted() {
//       let modal = document.getElementById("loanModal")
//       modal.addEventListener('hidden.bs.modal', () => {
//         this.step = 1; this.form = {}; this.error = null
//       })

//       this.$once('hook:destroyed', () => {
//         window.removeEventListener('hidden.bs.modal', ()=> {})
//       })
//   }
// }
</script>

<style lang="scss" scoped>

.fund-option {
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%2392ccbf' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='3' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 8px;
  transition: all 300ms ease-in;
  div:first-child {
    height: 44px;
    width: 44px;
  }
}

.bg-mint-lighter{
    background-color: rgba(146, 204, 191, 0.2)!important;
}

.fs-16{
    font-size: 16px;
}


</style>
