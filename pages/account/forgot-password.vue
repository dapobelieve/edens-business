<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center my-4">
      <div class="col-lg-5 col-xl-4 my-5 d-flex flex-column">
        <div class="d-flex justify-content-center mb-5">
          <div class=" d-flex"><Logo /></div>
        </div>
        <div class="mb-2 h-75">
          <div class="p-4 pt-5 border rounded-3 h-100 vh-auto d-flex flex-column">
            <div>
              <Indicator :activeTab="step" :tabs="3" />
            </div>
            <div v-if="error" class="alert alert-danger mb-1 mt-3" role="alert">
              {{ error }}
            </div>
            <template v-if="step===1">
              <Email @success="step=2; form={...form,...$event}" />
            </template>
            <template v-if="step===2">
              <Otp :email="form.email" @success="step=3; form={...form,...$event}" />
            </template>
            <template v-if="step===3">
              <Reset :btn="btn" @success="form= {...form,...$event}; resetPassword()" />
            </template>
          </div>
        </div>
        <div class="mt-3 text-center">
          <nuxt-link to="/account/login" class="text-eden-green fw-bolder text-decoration-underline">Back to login page</nuxt-link>
        </div>
      </div>
      <PasswordResetModal id="passwordResetModal" />
    </div>

  </div>
</template>

<script>
import Email from '~/components/register/forgotPassword/email'
import Otp from '~/components/register/forgotPassword/otp'
import Reset from '~/components/register/forgotPassword/reset'
import PasswordResetModal from '~/components/modals/PasswordResetModal'
export default {
  components: { PasswordResetModal, Otp, Email, Reset },
  layout: "blank",
  data() {
    return {
      successModal: null,
      error: null,
      btn: {
        loading: false
      },
      step: 1,
      form: {},
    }
  },
  methods: {
    async resetPassword() {
      this.btn.loading = true
      try {
        let res = await this.$axios.$patch('/auth/password', {...this.form})
        this.successModal.show()

      }catch (e) {
        this.error = e.message
        console.log({e})
        this.btn.loading = false
      }
      finally {

      }
    }
  },
  middleware: 'registration',
  mounted() {
    const modal = document.getElementById('passwordResetModal')
    this.successModal = new bootstrap.Modal(modal)

    modal.addEventListener('hidden.bs.modal', () => {
      this.$router.replace({
        name: 'account-login'
      })
    })

    this.$once('hook:destroyed', () => {
      window.removeEventListener('hidden.bs.modal', ()=> {})
    })
  }
}
</script>
