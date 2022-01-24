<template >
  <div>
    <h3 class="mt-4">Personal Details</h3>
    <p class="mt-1 mb-5">Tell us a little about yourself.</p>
    <form>
      <div class="mb-4">
        <label class="eden-text-input" :class="[$v.form.owner_first_name.$error ? 'eden-text-input-error': '']">
          <input v-model="$v.form.owner_first_name.$model" class="form-control" placeholder="First name">
          <span v-if="$v.form.owner_first_name.$error" class="ed-x"></span>
        </label>
        <small class="fs-7 text-bad-red" v-if="$v.form.owner_first_name.$error">{{fnameErr}}</small>
      </div>
      <div class="mb-4">
        <label class="eden-text-input" :class="[$v.form.owner_last_name.$error ? 'eden-text-input-error': '']">
          <input v-model="$v.form.owner_last_name.$model" class="form-control" placeholder="Last name">
          <span v-if="$v.form.owner_last_name.$error" class="ed-x"></span>
        </label>
        <small class="fs-7 text-bad-red" v-if="$v.form.owner_last_name.$error">{{lnameErr}}</small>
      </div>
      <div class="mb-5">
        <DatepickerComponent v-model="$v.form.owner_date_of_birth.$model" />
        <small class="fs-7 text-bad-red" v-if="$v.form.owner_date_of_birth.$error">{{dateErr}}</small>
      </div>
      <div class="mb-4">
        <label class="eden-text-input" :class="[$v.form.role.$error ? 'eden-text-input-error': '']">
          <input v-model="$v.form.role.$model" class="form-control" placeholder="Designated role">
          <span v-if="$v.form.role.$error" class="ed-x"></span>
        </label>
        <small class="fs-7 text-bad-red" v-if="$v.form.role.$error">{{roleErr}}</small>
      </div>
      <div class="d-flex justify-content-between pt-3 ">
          <button :disabled="otpVerified"  class="btn btn-outline-eden-mint px-3 me-3" @click.prevent="$emit('back')">
            <span class="ed-arrow-left"></span>Back</button>
          <button @click.prevent="proceed" class="btn btn-jungle-green" >Proceed</button>
      </div>
    </form>
  </div>
</template>
<script>
import { required, alpha } from "vuelidate/lib/validators";
export default {
  props:  {
    otpVerified: {
      type: Boolean
    }
  },
  data () {
    return {
      form: {
        owner_first_name: null,
        owner_last_name: null,
        owner_date_of_birth: null,
        role: null
      }
    }
  },
  methods: {
    proceed() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('success', {...this.form})
      }
    }
  },
  validations: {
    form: {
      owner_first_name:{ required, alpha},
      owner_last_name:{ required, alpha},
      role:{ required },
      owner_date_of_birth:{ required },
    }
  },
  computed: {
    fnameErr() {
      if (!this.$v.form.owner_first_name.required) return "First name is required";
      if (!this.$v.form.owner_first_name.alpha) return "First name should contain alphabets";
    },
    lnameErr() {
      if (!this.$v.form.owner_last_name.required) return "Last name is required";
      if (!this.$v.form.owner_last_name.alpha) return "Last name should contain alphabets";
    },
    roleErr() {
      if (!this.$v.form.role.required) return "Please enter your role in the organization";
    },
    dateErr() {
      if (!this.$v.form.owner_date_of_birth.required) return "Select your date of birth";
    },
  }
}
</script>
