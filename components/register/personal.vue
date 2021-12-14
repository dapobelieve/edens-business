<template >
  <div>
    <h3 class="mt-4">Personal Details</h3>
    <p class="mt-1 mb-5">Tell us a little about yourself.</p>
    <form>
      <div class="mb-4">
        <label class="eden-text-input" :class="[$v.form.first_name.$error ? 'eden-text-input-error': '']">
          <input v-model="$v.form.first_name.$model" class="form-control" placeholder="First name">
          <span v-if="$v.form.first_name.$error" class="ed-x"></span>
        </label>
        <small class="fs-7 text-bad-red" v-if="$v.form.first_name.$error">{{fnameErr}}</small>
      </div>
      <div class="mb-4">
        <label class="eden-text-input" :class="[$v.form.last_name.$error ? 'eden-text-input-error': '']">
          <input v-model="$v.form.last_name.$model" class="form-control" placeholder="Last name">
          <span v-if="$v.form.last_name.$error" class="ed-x"></span>
        </label>
        <small class="fs-7 text-bad-red" v-if="$v.form.last_name.$error">{{lnameErr}}</small>
      </div>
      <div class="mb-4">
        <label class="eden-text-input" :class="[$v.form.email.$error ? 'eden-text-input-error': '']">
          <input v-model="$v.form.email.$model" class="form-control" placeholder="Email">
          <span v-if="$v.form.email.$error" class="ed-x"></span>
        </label>
        <small class="fs-7 text-bad-red" v-if="$v.form.email.$error">{{emailErr}}</small>
      </div>
      <div class="mb-5">
        <DatepickerComponent v-model="$v.form.date_of_birth.$model" />
        <small class="fs-7 text-bad-red" v-if="$v.form.date_of_birth.$error">{{dateErr}}</small>
      </div>
      <div class="d-grid">
          <button @click.prevent="proceed" class="btn btn-jungle-green justify-content-center" >Proceed</button>
      </div>
    </form>
  </div>
</template>
<script>
import { required, email, alpha } from "vuelidate/lib/validators";
export default {
  data () {
    return {
      form: {
        first_name: null,
        last_name: null,
        email: null,
        date_of_birth: null,
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
      first_name:{ required, alpha},
      last_name:{ required, alpha},
      email:{ required, email},
      date_of_birth:{ required },
    }
  },
  computed: {
    fnameErr() {
      if (!this.$v.form.first_name.required) return "First name is required";
      if (!this.$v.form.first_name.alpha) return "First name should contain alphabets";
    },
    lnameErr() {
      if (!this.$v.form.last_name.required) return "Last name is required";
      if (!this.$v.form.last_name.alpha) return "Last name should contain alphabets";
    },
    emailErr() {
      if (!this.$v.form.email.required) return "Email address is required";
      if (!this.$v.form.email.email) return "Invalid email address";
    },
    dateErr() {
      if (!this.$v.form.date_of_birth.required) return "Select your date of birth";
    },
  },
  mounted() {
    document.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.proceed();
      }
    });
  }
}
</script>
