<template>
  <div class="d-flex flex-column h-100">
    <div>
      <h3 class="mt-4">Password Reset.</h3>
      <p class="mt-1 mb-5">Enter your registered email address to begin password reset process.</p>
    </div>

    <div class="mb-4 flex-grow-1">
      <label class="eden-text-input" :class="[$v.form.email.$error ? 'eden-text-input-error': '']">
        <input v-model="$v.form.email.$model" class="form-control" placeholder="Email Address">
        <span v-if="$v.form.email.$error" class="ed-x"></span>
      </label>
      <small class="fs-7 text-bad-red" v-if="$v.form.email.$error">{{emailErr}}</small>
    </div>
    <div class="d-grid">
      <eden-button :loading="btn.loading" :disabled="btn.loading" @click="verifyEmail" class="btn d-flex justify-content-around btn-jungle-green">Proceed</eden-button>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import EdenButton from '~/components/EdenButton'
export default {
  components: { EdenButton },
  data() {
    return {
      btn: {
        loading: false
      },
      error: null,
      form: {
        email: ""
      }
    }
  },
  validations: {
    form: {
      email: {
        required, email
      }
    }
  },
  computed: {
    emailErr() {
      if (!this.$v.form.email.required) return "Email address is required";
      if (!this.$v.form.email.email) return "Invalid email address";
    },
  },
  methods: {
    async verifyEmail() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          this.btn.loading = true;
          let res = await this.$axios.$post('/auth/reset', {
            ...this.form
          })
          let toast = new bootstrap.Toast(document.getElementById('liveToast'), {
            delay: 7000,
            animation: true,
          })
          this.$store.commit('auth/setStates', {toast: {show: true,
              data: {
                header: 'Password reset token sent',
                body: res.message
              }}})
          toast.show()
          this.$emit('success', this.form)
        } catch (e) {
          // console.log(e)
          this.btn.loading = false;
        } finally {
          // alert("A token has been sent to your email addresss")
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
