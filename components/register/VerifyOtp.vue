<template>
  <div>
    <h3 class="mt-4">Verify your phone number.</h3>
    <div v-if="error" class="alert alert-danger mb-3 mt-3" role="alert">
      {{ error }}
    </div>
    <p class="mt-1 mb-5 body-1 fw-normal">Enter the OTP sent to your phone number;
      <span class="text-jungle-green">({{ phone }})</span>.</p>
    <form class="flex-grow-1">
      <div class="mb-10">
        <input v-model="form.otp" class="form-control" placeholder="Enter OTP">
      </div>

      <div class="d-flex mb-6 justify-content-between pt-6">
        <TimerComponent />
        <div class="">
          <eden-button :disabled="btn.loading" :loading="btn.loading" class="btn btn-sm btn-outline-eden-mint px-3 me-3" @click.prevent="verifyOtp">
            Verify</eden-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import TimerComponent from '~/components/TimerComponent'
import EdenButton from '~/components/EdenButton'
export default {
  components: { EdenButton, TimerComponent },
  props: ['phone', 'demo'],
  data() {
    return {
      error: null,
      btn: {
        loading:false,
      },
      form: {
        otp: ''
      },
    };
  },
  methods: {
    async verifyOtp() {
      if(this.form.otp) {
        this.btn.loading = true
        try {
          let res = await this.$axios.post('internals/otp/verify', {
            otp: this.form.otp,
            token: this.demo.email
          })
          this.$emit('verified')
        }catch (e) {
          this.error = e.message
          this.btn.loading = false
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
