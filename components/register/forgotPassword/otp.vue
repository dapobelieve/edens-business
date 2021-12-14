<template>
  <div class="d-flex flex-column h-100">
    <div>
      <h3 class="mt-4">Password Reset.</h3>
      <p class="mt-1 mb-1 body-1 text-black-50">Enter the OTP sent to your email address; <span class="text-eden-green">({{email}})</span>.</p>
    </div>
    <div v-if="error" class="alert alert-danger mb-3 mt-3" role="alert">
      {{ error }}
    </div>
    <div class="mb-4 flex-grow-1">
      <label class="eden-text-input" :class="[$v.form.otp.$error ? 'eden-text-input-error': '']">
        <input v-model="$v.form.otp.$model" class="form-control" placeholder="Enter OTP">
        <span v-if="$v.form.otp.$error" class="ed-x"></span>
      </label>
      <small class="fs-7 text-bad-red" v-if="$v.form.otp.$error">{{otpErr}}</small>
    </div>

    <div class="d-lg-flex justify-content-between">
      <div class="d-block mb-3 mb-xl-0">
        <TimerComponent />
      </div>
      <eden-button :loading="btn.loading" :disabled="btn.loading" @click="verifyEmail" class="btn d-inline-block text-center btn-jungle-green">Proceed</eden-button>
    </div>
  </div>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";
import EdenButton from '~/components/EdenButton'
export default {
  components: { EdenButton },
  props: {
    email: {
      type:  String
    }
  },
  data() {
    return {
      btn: {
        loading: false
      },
      error: null,
      form: {
        otp: null
      }
    }
  },
  validations: {
    form: {
      otp: {
        required
      }
    }
  },
  computed: {
    otpErr() {
      if (!this.$v.form.otp.required) return "Otp required";
      if (!this.$v.form.otp.numeric) return "Invalid OTP format";
    },
  },
  methods: {
    async verifyEmail() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          this.btn.loading = true;
          let res = await this.$axios.$post('/auth/password/verify', {
            ...this.form, email: this.email
          })
          this.$emit('success', this.form)
        } catch (e) {
          this.error = e.message
          this.btn.loading = false
        } finally {
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
