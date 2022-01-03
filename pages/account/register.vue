<template>
  <div class="register vh-100 px-xl-6 pt-6 d-flex flex-column">
    <logo />
    <Indicator :half="half" :tabs="4" :activeTab="step" class="mt-4" />
    <div class="flex-grow-1">
      <template v-if="step===1">
        <keep-alive>
          <organization @success="form = {...form, ...$event}; step=2" />
        </keep-alive>
      </template>
      <template v-if="step === 2">
        <keep-alive>
          <PhoneNumber @back="step=1" @success="form = {...form, ...$event}; step=3" />
        </keep-alive>
      </template>
      <template v-if="step===3">
        <keep-alive>
          <personal :otpVerified="otpVerified" @back="step=2" @success="form = {...form, ...$event}; step=4" />
        </keep-alive>
      </template>
      <template v-if="step===4">
        <password :btn="btn" @back="step=3" @success="form = {...form, ...$event}; register()" />
      </template>
    </div>
    <div class="text-center mb-4">
      <small class="text-black-50">By proceeding you accept our <nuxt-link class="text-eden-green text-decoration-underline" to="/">Terms & Conditions</nuxt-link></small>
    </div>
  </div>
</template>

<script>
import Personal from '~/components/register/personal'
import PhoneNumber from '~/components/register/PhoneNumber'
import Password from '~/components/register/password'
import Organization from '~/components/register/organization'
export default {
  components: { Organization, Password, PhoneNumber, Personal },
  layout: "auth",
  data () {
    return {
      step: 1,
      half: 0,
      otpVerified: false,
      noOrganization: false,
      verifyPhone: false,
      form: {},
      btn: {
        loading:false,
        text: 'Proceed'
      },
    }
  },
  watch: {
    step(newVal) {
      if(newVal === 3) {
        this.half = 3
      }
    }
  },
  methods: {
    async register() {
      this.btn.loading = true
      this.btn.text = 'processing'
      try {
        let res = await this.$store.dispatch('auth/register', this.form)
        window.location = '/'
      }catch (e) {
        console.log({e})
        this.btn.loading = false
        this.btn.text = 'Finish'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  input[type=checkbox] {
    border-color: var(--bs-eden-mint);
    &:checked {
      background-color: var(--bs-eden-mint);
    }
  }
}
</style>
