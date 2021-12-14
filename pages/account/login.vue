<template>
  <div class="register px-xl-6 pt-6">
  <!-- <div class="register pt-xl-8 px-xl-8 pt-6"> -->
    <logo />
    <div class="mt-6 mb-4">
      <TabComponent v-model="activeTab" :tabItems="tabs">
        <div v-for="(tab, tabIndex) in tabs" :slot="`tab-head-${tab}`" :key="tabIndex">{{tab}}</div>
      </TabComponent>
    </div>
    <div v-if="error" class="alert alert-danger mb-3 mt-3" role="alert">
      {{ error }}
    </div>
    <h3 class="">Welcome.</h3>
    <p class="mb-5">Please enter your login to proceed.</p>
      <form class="flex-grow-1">
      <div class="mb-4">
        <label class="eden-text-input" :class="[$v.form.email.$error ? 'eden-text-input-error': '']">
          <input v-model="$v.form.email.$model" class="form-control" placeholder="Email">
          <span v-if="$v.form.email.$error" class="ed-x"></span>
        </label>
        <small class="fs-7 text-bad-red" v-if="$v.form.email.$error">{{emailErr}}</small>
      </div>
      <div class="mb-5">
        <PasswordComponent :class="[$v.form.password.$error ? 'eden-text-input-error': '']" class="mb-1" placeholder="Password" v-model="$v.form.password.$model" />
        <small class="fs-7 text-bad-red" v-if="$v.form.password.$error">{{passErr}}</small>
        <div class="text-end">
          <nuxt-link to="/account/forgot-password" class="fw-normal text-eden-green fs-7">Forgot Password</nuxt-link>
        </div>
      </div>

      <div class="d-grid">
        <EdenButton :disabled="btn.loading" :loading="btn.loading" class="btn btn-jungle-green d-flex justify-content-around" @click.prevent="login">Sign In</EdenButton>
      </div>

      <div class="mt-3 text-center">
        <small>Don't have an account?  <nuxt-link to="/account/register" class="text-eden-green text-decoration-underline fw-bold">Join Edens360</nuxt-link></small>
      </div>
    </form>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import EdenButton from '~/components/EdenButton'
export default {
  components: { EdenButton },
  layout: "auth",
  data() {
    return {
      tabs: ['Personal Account', 'Business Account'],
      activeTab: "Personal Account",
      error: null,
      form: {
        email: null,
        password: null
      },
      btn: {
        loading: false,
        text: 'Sign In'
      },
    }
  },
  watch: {
    activeTab(newVal) {
      if (newVal === 'Organization')
        window.location.href = process.env.NUXT_ENV_ORGANIZATION_URL
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },
  methods: {
    handler(e) {
      console.log(e.target)
    },
    async login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          this.btn.loading = true;
          this.btn.text = 'loading...';
          let res = await this.$store.dispatch('auth/login', { ...this.form })
          this.$router.push('/')
        } catch (e) {
          this.error = e.message
          this.btn.loading = false;
          this.btn.text = 'Sign In';
        }
      }
    }
  },
  computed: {
    emailErr() {
      if (!this.$v.form.email.required) return "Email address is required";
      if (!this.$v.form.email.alpha) return "Invalid email address";
    },
    passErr() {
      if (!this.$v.form.password.required) return "Password is required";
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  input[type=checkbox] {
    height: 1.25rem;
    width: 1.25rem;
    border-color: var(--bs-eden-mint);
    &:checked {
      background-color: var(--bs-eden-mint);
    }
  }
}
</style>
