<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header px-4">
          <h5 class="modal-title">Change card PIN</h5>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div class="modal-body">
          <div class="px-2 pt-3" style="height: 24rem">
            <div class="mb-4">
              <label class="eden-text-input" :class="[$v.form.email.$error ? 'eden-text-input-error': '']">
                <input v-model="$v.form.email.$model" class="form-control" placeholder="Old PIN">
                <span v-if="$v.form.email.$error" class="ed-x"></span>
              </label>
              <small class="fs-7 text-bad-red" v-if="$v.form.email.$error">{{emailErr}}</small>
            </div>
            <div class="mb-4">
              <label class="eden-text-input" :class="[$v.form.email.$error ? 'eden-text-input-error': '']">
                <input v-model="$v.form.email.$model" class="form-control" placeholder="New PIN">
                <span v-if="$v.form.email.$error" class="ed-x"></span>
              </label>
              <small class="fs-7 text-bad-red" v-if="$v.form.email.$error">{{emailErr}}</small>
            </div>
            <div class="mb-4">
              <label class="eden-text-input" :class="[$v.form.email.$error ? 'eden-text-input-error': '']">
                <input v-model="$v.form.email.$model" class="form-control" placeholder="Confirm New PIN">
                <span v-if="$v.form.email.$error" class="ed-x"></span>
              </label>
              <small class="fs-7 text-bad-red" v-if="$v.form.email.$error">{{emailErr}}</small>
            </div>
          </div>
          <div>
            <p class="mb-0 fs-7 text-black-50 text-center">Forgot Old PIN? <a class="fw-bold text-jungle-green cursor-pointer">Reset PIN</a></p>
          </div>
        </div>
        <div class="modal-footer px-4 justify-content-between mb-3">
<!--          <button data-bs-dismiss="modal" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">-->
<!--            <span class="ed-arrow-left text-eden-mint "></span>Back</button>-->
          <EdenButton @click="changePin" :loading="btn.loading" :disabled="btn.loading" type="button" class="ms-auto btn btn-sm btn-jungle-green px-5">Save</EdenButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FundByBank from '~/components/wallet/FundByBank'
import EdenButton from '~/components/EdenButton'
import { required, email } from 'vuelidate/lib/validators'
export default {
  components: { EdenButton, FundByBank },
  data () {
    return {
      btn: {
        loading: false
      }
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },
  methods:{
    async changePin() {
      this.btn.loading = true
      setTimeout(() => {
        this.btn.loading = false
        let toast = new bootstrap.Toast(document.getElementById('liveToast'), {
          delay: 7000,
          animation: true,
        })
        this.$store.commit('auth/setStates', {toast: {show: true,
            data: {
              header: 'Check your email!',
              body: 'A PIN reset link has been sent to your email address; jes***ca@gmail.com'
            }}})
        toast.show()
      }, 5000)
    }
  },
  mounted() {
    let modal = document.getElementById("changePin")
    modal.addEventListener('hidden.bs.modal', () => {
      this.btn.loading = false
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
