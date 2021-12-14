<template>
  <div>
    <div class="mb-5">
      <p class="mb-1 caption-2">Passwords Settings</p>
      <small  class="text-black-50 body-1 fw-normal">Set a new password for your account.</small>
      <div class="mt-5">
        <div class="mb-1">
          <PasswordComponent :class="[$v.form.password.$error ? 'eden-text-input-error': '']" placeholder="Password" v-model="$v.form.password.$model" />
          <small class="fs-7 text-bad-red" v-if="$v.form.password.$error">{{passErr}}</small>
        </div>
        <div class="d-flex">
          <a class="ms-auto cursor-pointer text-jungle-green body-1 caption-2">Update Password</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, sameAs, helpers } from "vuelidate/lib/validators";
import EdenButton from '~/components/EdenButton'
const passwordFormat = helpers.regex('passwordFormat', /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/)
export default {
  data () {
     return {
       form: {
         password: null,
         confirmPassword: null,
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
  passErr()  {
    if (!this.$v.form.password.required) return "Password is required";
    if (!this.$v.form.password.passwordFormat) return `Password should contain at least 1 Uppercase at least  1  lower case and 1 number 1 special character`;
  },
  confirmErr()  {
    if (!this.$v.form.password.required) return "Password is required";
    if (!this.$v.form.password.sameAsPassword) return `Passwords don't match`;
  }
}
</script>

<style scoped>

</style>
