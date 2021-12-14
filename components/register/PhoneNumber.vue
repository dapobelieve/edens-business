<template>
  <div>
    <template v-if="!verifyPhone">
      <h3 class="mt-4">Phone Number</h3>
      <p class="mt-1 mb-5 body-1 fw-normal">Enter your phone number.</p>
      <div v-if="error" class="alert alert-danger mb-3 mt-3" role="alert">
        {{ error }}
      </div>
      <form class="flex-grow-1">
        <div class="mb-10">
          <div class="position-relative">
            <label class="eden-text-input" :class="[$v.form.phone_number.$error ? 'eden-text-input-error': '']">
              <input style="padding-left: 46px" class="form-control" v-model="$v.form.phone_number.$model" />
              <span v-if="$v.form.phone_number.$error" class="ed-x"></span>
              <small style="top: 18px; left: 13px; font-size: 0.875rem; font-weight: 500" class="position-absolute">+231</small>
            </label>
            <small class="fs-7 text-bad-red" v-if="$v.form.phone_number.$error">{{phoneErr}}</small>
          </div>
        </div>
        <div class="d-flex mb-6 justify-content-between pt-6">
          <button class="btn btn-outline-eden-mint px-3 me-3" @click.prevent="$emit('back')">
            <span class="ed-arrow-left"></span>Back
          </button>
          <eden-button :disabled="btn.loading" :loading="btn.loading" class="btn btn-jungle-green" @click.prevent="sendOtp">{{ btn.text }}</eden-button>
        </div>
      </form>
    </template>
    <template v-else>
      <VerifyOtp :phone="form.phone_number" :demo="demo" @verified="$emit('success', {...form}); otpVerified=true" />
    </template>
  </div>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";
import VerifyOtp from '~/components/register/VerifyOtp';
import EdenButton from '~/components/EdenButton';
export default {
  props: {
    demo: {
      type: Object
    }
  },
  components: { EdenButton, VerifyOtp },
  data ()  {
    return {
      error: null,
      btn: {
        loading:false,
        text: 'Proceed'
      },
      verifyPhone: false,
      form: {
        phone_number: null
      }
    }
  },
  validations:{
    form: {
      phone_number: { required, numeric }
    }
  },
  computed: {
    phoneErr() {
      if (!this.$v.form.phone_number.required) return "Phone number is required";
      if (!this.$v.form.phone_number.numeric) return "Phone number should only contain numbers";
    }
  },
  methods: {
    async sendOtp() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          this.btn.loading = true
          if (this.form.phone_number) {
            let res = await this.$axios.post('internals/otp', { ...this.form, type: 'phone' })
            await this.$axios.$post('internals/otp/email', {
              email: this.demo.email
            })

            this.verifyPhone = true
          }
        } catch (e) {
          this.error = e.message
        }finally {
          this.btn.loading = false
          this.btn.text = 'Proceed'
        }
      }
    },
  },
  mounted() {
    document.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.sendOtp();
      }
    });
  }
}
</script>
