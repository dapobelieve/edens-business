<template>
  <div class="d-flex flex-column h-100">
    <h3 class="mt-4">Password Reset.</h3>
    <p class="mt-1 mb-5 body-1 text-black-50">Enter your new password.</p>
    <form class="flex-grow-1">
      <div class="mb-4">
        <PasswordComponent :class="[$v.form.password.$error ? 'eden-text-input-error': '']" placeholder="Password" v-model="$v.form.password.$model" />
        <small class="fs-7 text-bad-red" v-if="$v.form.password.$error">{{passErr}}</small>
      </div>
      <div class="mb-6">
        <PasswordComponent :class="[$v.form.confirmPassword.$error ? 'eden-text-input-error': '']" placeholder="Confirm Password" v-model="$v.form.confirmPassword.$model" />
        <small class="fs-7 text-bad-red" v-if="$v.form.confirmPassword.$error">{{confirmErr}}</small>
      </div>

    </form>
    <div class="d-grid">
      <eden-button :disabled="btn.loading" :loading="btn.loading"  class="btn btn-jungle-green d-flex justify-content-around" @click.prevent="submitPass">Reset</eden-button>
    </div>
  </div>
</template>

<script>
import { required, sameAs, helpers } from "vuelidate/lib/validators";
import EdenButton from "~/components/EdenButton";
const passwordFormat = helpers.regex('passwordFormat', /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/)

export default {
  components: {EdenButton},
  props: {
    btn: [],
    otpVerified: {
      type: Boolean
    }
  },
  data()  {
    return {
      form: {
        password: null,
        confirmPassword: null,
      }
    }
  },
  methods: {
    submitPass() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("success", {...this.form})
      }
    }
  },
  validations: {
    form: {
      password: { required, passwordFormat },
      confirmPassword: { required, sameAsPassword: sameAs('password')
      }
    }
  },
  computed: {
    passErr()  {
      if (!this.$v.form.password.required) return "Password is required";
      if (!this.$v.form.password.passwordFormat) return `Password should contain at least 1 Uppercase at least  1  lower case and 1 number 1 special character`;
    },
    confirmErr()  {
      if (!this.$v.form.password.required) return "Password is required";
      if (!this.$v.form.password.sameAsPassword) return `Passwords don't match`;
    }
  }
}
</script>
