<template>
  <div>
    <h3 class="mt-4">Let’s get you registered.</h3>
    <p class="mt-1 mb-5 body-1 fw-normal">Select your organization from the list.</p>
    <form @keyup.enter="proceed" class="flex-grow-1">
      <div class="mb-4">
        <SelectComponent :options="organizations" v-model="organization" />
        <small class="fs-7 text-bad-red" v-if="$v.organization.$error">{{orgErrs}}</small>
      </div>
      <div class="mb-5">
        <label class="d-flex align-items-center">
          <input v-model="noOrganization" type="checkbox" class="form-check-input me-2 mt-0 cursor-pointer"> <span class="body-1">Check this box if your organization is not listed.</span>
        </label>
      </div>
      <div class="mb-4">
        <input :disabled="!noOrganization" class="form-control" v-model="$v.form.organization_name.$model" placeholder="Your Organisation name">
        <small class="fs-7 text-bad-red" v-if="$v.form.organization_name.$error">{{nameErr}}</small>
      </div>

      <div class="mb-5">
        <input :disabled="!noOrganization" class="form-control" v-model="$v.form.organization_email.$model" placeholder="Your Organisation email address">
        <small class="fs-7 text-bad-red" v-if="$v.form.organization_email.$error">{{emailErr}}</small>
      </div>

      <div class="d-grid">
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
      organization: null,
      organizations: [],
      form: {
        organization_id: null,
        organization_email: null,
        organization_name: null,
      },
    }
  },
  watch:{
    noOrganization(newVal) {
      if(newVal) {
        this.organization = null
        this.form.organization_id = null
      }
    },
    organization(newVal) {
      if (newVal)
        this.form.organization_id = newVal.value
    }
  },
  validations:{
    organization: { required: requiredIf(function(form) {
      return !this.noOrganization
      }) },
    form: {
      organization_email: { required: requiredIf(function(form) {
        return this.noOrganization
        }), email},
      organization_name: { required: requiredIf(function(form) {
          return this.noOrganization
        })},
    }
  },
  computed: {
    orgErrs() {
      if (!this.$v.organization.required) return "Select your Organization"
    },
    emailErr() {
      if (!this.$v.form.organization_email.required) return "Organization email address is required";
      if (!this.$v.form.organization_email.email) return "Invalid email address format";
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
  async mounted() {
    document.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.proceed();
      }
    });

    try {
      let res = await this.$store.dispatch('auth/organizations')
        res.reduce((acc, item) => {acc.push({ name: item.name, value: item.id })
          return acc
        }, this.organizations)
    }catch(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
