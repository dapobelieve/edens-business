<template>
  <div>
    <h3 class="mt-4">Let’s get you registered.</h3>
    <p class="mt-1 mb-5 body-1 fw-normal text-black-50">Tell us about your organization</p>
    <form class="flex-grow-1">
      <div class="mb-4">
        <input class="form-control" v-model="$v.form.organization_name.$model" placeholder="Business name">
        <small class="fs-7 text-bad-red" v-if="$v.form.organization_name.$error">{{nameErr}}</small>
      </div>
      <div class="mb-5">
        <input class="form-control" v-model="$v.form.email.$model" placeholder="Business email address">
        <small class="fs-7 text-bad-red" v-if="$v.form.email.$error">{{emailErr}}</small>
      </div>
      <div class="mb-4">
        <SelectComponent :options="types" placeholder="Business type" v-model="organization" />
        <small class="fs-7 text-bad-red" v-if="$v.organization.$error">{{orgErrs}}</small>
      </div>

      <div class="d-grid mt-7">
        <button @click.prevent="proceed" class="btn btn-jungle-green justify-content-center">Proceed</button>
      </div>

      <div class="mt-3 text-center">
        <small>Already have an  account?  <nuxt-link to="/account/login" class="text-eden-green text-decoration-underline fw-bold">Login</nuxt-link></small>
      </div>
    </form>
  </div>
</template>

<script>
import { required, requiredIf, email, alpha } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      noOrganization: false,
      types: [
        {name: 'Tech', value: 1},
        {name: 'Educational', value: 2},
        {name: 'Financial', value: 3},
        {name: 'Religious', value: 4},
      ],
      organization: null,
      form: {
        organization_industry: "tech",
        email: null,
        organization_name: null,
      },
    }
  },
  watch:{
    noOrganization(newVal) {
      if(newVal) {
        this.organization = null
      }
    }
  },
  validations:{
    organization: { required },
    form: {
      email: { required, email},
      organization_name: { required },
    }
  },
  computed: {
    orgErrs() {
      if (!this.$v.organization.required) return "Select your Organization type"
    },
    emailErr() {
      if (!this.$v.form.email.required) return "Organization email address is required";
      if (!this.$v.form.email.email) return "Invalid email address format";
    },
    nameErr() {
      if (!this.$v.form.organization_name.required) return "Organization name is required";
    },
  },
  methods: {
    proceed() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('success', {...this.form})
      }
    }
  },
  async created() {
    try {
      let res = await this.$store.dispatch('auth/organizations')
      console.log('wawu')
    }catch(e) {

    }
  }
}
</script>

<style scoped>

</style>
