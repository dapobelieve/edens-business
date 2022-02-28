<template>
  <div class="register vh-100 px-xl-6 pt-6 d-flex flex-column">
    <logo />
    <Indicator :half="half" :tabs="4" :activeTab="step" class="mt-4" />
    <div class="flex-grow-1">
      <template v-if="step===1">
        <keep-alive>
          <directorinfo :invite="invite" @success="form = {...form, ...$event}; step=2" />
        </keep-alive>
      </template>
      <template v-if="step === 2">
        <keep-alive>
          <PhoneNumber :demo="{email: invite.invitee_email}" @back="step=1" @success="form = {...form, ...$event}; step=3" />
        </keep-alive>
      </template>
      <template v-if="step===3">
        <keep-alive>
          <upload @back="step=2" @success="form = {...form, ...$event}; step=4" />
        </keep-alive>
      </template>
      <template v-if="step===4">
<!--        <keep-alive>-->
          <password :btn="btn" @back="step=3" @success="form = {...form, ...$event}; register()" />
<!--        </keep-alive>-->
      </template>
    </div>
    <div class="text-center mb-4">
      <small class="text-black-50">By proceeding you accept our <nuxt-link class="text-eden-green text-decoration-underline" to="/">Terms & Conditions</nuxt-link></small>
    </div>
  </div>
</template>

<script>
import Upload from '~/components/register/upload'
import PhoneNumber from '~/components/register/PhoneNumber'
import Password from '~/components/register/password'
import Directorinfo from '~/components/register/directorinfo'
export default {
  name: 'Director-Invite',
  components: { Directorinfo, Password, PhoneNumber, Upload },
  layout: "auth",
  data () {
    return {
      invite: {},
      step: 1,
      half: 0,
      otpVerified: false,
      noOrganization: false,
      verifyPhone: true,
      form: {
      },
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
  async asyncData(ctx) {
    try {
      let res = await ctx.$axios.$get(`business/invite/${ctx.route.query.invite_link}`)
      return { invite: res.invite }
    }catch (e) {
      console.log(e)
    }
  },
  methods: {
    async register() {
      this.form.invite_link = this.invite.invite_link
      console.log(this.form)
      this.btn.loading = true
      this.btn.text = 'processing'
      try {
        // let res = await this.$store.dispatch('business/signup', this.form)
        // window.location = '/'
        // this.$router.replace('/')
      }catch (e) {
        console.log({e})
        this.btn.loading = false
        this.btn.text = 'Finish'
      }
    }
  },
  mounted() {
    // console.log(this.$route)
    // await this.$axios.get(`business/invite/${}`)
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
