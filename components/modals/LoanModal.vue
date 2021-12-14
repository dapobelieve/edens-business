<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <!-- <template v-if="step === 1">
        <keep-alive>
          <LoanType @close-loan="close" @loan-proceed="form={...form,...$event}; step=2" />
        </keep-alive>
      </template>
      <template v-if="step === 2">
        <keep-alive>
          <OrganizationDetails @back="back" @loan-proceed="form={...form,...$event}; step=3" />
        </keep-alive>
      </template>
      <template v-if="step === 3">
        <keep-alive>
          <Identification @back="back" @loan-proceed="form={...form,...$event}; step=4" />
        </keep-alive>
      </template> -->
      <template v-if="step === 1">
        <keep-alive>
          <SetAmount @back="close" @loan-proceed="form={...form,...$event}; step=2" />
        </keep-alive>
      </template>
      <template v-if="step === 2">
        <keep-alive>
          <SetDuration @back="back" @loan-proceed="form={...form,...$event}; step=3" />
        </keep-alive>
      </template>
      <!-- <template v-if="step === 3">
        <keep-alive>
          <Payslip @back="back" @loan-proceed="form={...form,...$event}; step=7" />
        </keep-alive>
      </template> -->
      <template v-if="step === 3">
        <LoanSummary @back="back" :form="form" @success="submit" :btn="btn"  />
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import Indicator from '~/components/Indicator'
import SetAmount from '~/components/loans/SetAmount'
import LoanType from '~/components/loans/LoanType'
import OrganizationDetails from '~/components/loans/OrganizationDetails'
import Identification from '~/components/loans/Identification'
import SetDuration from '~/components/loans/SetDuration'
import Loader from '~/components/Loader'
import EdenButton from '~/components/EdenButton'
import Payslip from '~/components/loans/Payslip'
import LoanSummary from '~/components/loans/LoanSummary'
export default {
  components: { LoanSummary, Payslip, EdenButton, Loader, SetDuration, SetAmount, Indicator, LoanType, OrganizationDetails, Identification },
  data () {
    return {
      step: 1,
      form: {
      },
      error: null,
      btn: {
        text: 'Next',
        loading: false
      }
    }
  },
  methods: {
    back() {
      this.step--
    },
    async submit() {
      this.btn.text= 'Processing...';
      this.btn.loading = true
      // try {
      //   let res = await this.$store.dispatch('loan/loanRequest', {...this.form})
        this.$emit('loan-success')
        let toast = new bootstrap.Toast(document.getElementById('liveToast'), {
          delay: 7000,
          animation: true,
        })
        this.$store.commit('auth/setStates', {toast: {show: true,
            data: {
              header: 'Loan request sent!',
              body: 'Your loan request has been sent to your organization HR for approval.'
            }}})
        toast.show()
      // }catch (e) {
      //   this.error = e.message
      // }finally {
      //   this.btn.text= 'Next';
      //   this.btn.loading = false
      // }
    },
    close() {
      let modal = bootstrap.Modal.getInstance(document.getElementById('loanModal'))
      modal.hide()
    }
  },
  mounted() {
      let modal = document.getElementById("loanModal")
      modal.addEventListener('hidden.bs.modal', () => {
        this.step = 1; this.form = {}; this.error = null
      })

      this.$once('hook:destroyed', () => {
        window.removeEventListener('hidden.bs.modal', ()=> {})
      })
  }
}
</script>

<style lang="scss" scoped>
.border-card {
  border: 1px solid rgba(0, 32, 38, 0.1);
  border-radius: 1rem;
  >div:not(:last-child) {
    border-bottom: 1px solid rgba(0, 32, 38, 0.1);

  }
}
.interest-section {
  > div {
    background: rgba(0, 32, 38, 0.02);
    border-radius: 8px;
    >div:first-child {
      height: 20px;
      width: 20px;
      border: 2px solid #92CCBF;
    }
  }
}
.profile {
  &-avatar {
    width: 100%;
    max-width: 400px;
  }
  &-form {
    .col-auto {
      width: 150px;
      @media screen and (max-width: 400px) {
      }
    }
    .body-1 {
      color: rgba(0, 32, 38, 0.6);
    }
  }
  .uploader {
    height: 32px;
    width: 32px;
  }
}

</style>
