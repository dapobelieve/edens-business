<template >
  <div>
    <h3 class="mt-4">Let’s get you registered.</h3>
    <p class="mt-1 mb-5">Tell us about yourself</p>
    <form>
      <div class="fund-option px-4 mb-4 d-flex py-3 align-items-center cursor-pointer">
          <div class="rounded-circle inner-border flex-shrink-0 bg-mint-lighter d-inline-flex align-items-center me-4 justify-content-center">
            <p class="mb-0 fw-bolder text-eden-mint">BN</p>
          </div>
          <div>
              <p class="mb-0 body-1 text-black-50 ">Invited by</p>
              <p class="mb-0 fw-bolder">Hello, Braide Enterprises</p>
          </div>
      </div>
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
      <div class="mb-5">
        <DatepickerComponent v-model="$v.form.date_of_birth.$model" />
        <small class="fs-7 text-bad-red" v-if="$v.form.date_of_birth.$error">{{dateErr}}</small>
      </div>
      <div class="mb-4">
        <label class="eden-text-input" :class="[$v.form.role.$error ? 'eden-text-input-error': '']">
          <input v-model="$v.form.role.$model" class="form-control" placeholder="Designated role">
          <span v-if="$v.form.role.$error" class="ed-x"></span>
        </label>
        <small class="fs-7 text-bad-red" v-if="$v.form.role.$error">{{roleErr}}</small>
      </div>
      <div class="d-grid pt-3 ">
          <button @click.prevent="proceed" class="btn btn-jungle-green justify-content-center" >Proceed</button>
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
        first_name: null,
        last_name: null,
        date_of_birth: null,
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
      first_name:{ required, alpha},
      last_name:{ required, alpha},
      role:{ required },
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
    roleErr() {
      if (!this.$v.form.role.required) return "Please enter your role in the organization";
    },
    dateErr() {
      if (!this.$v.form.date_of_birth.required) return "Select your date of birth";
    },
  }
}
</script>

<style lang="scss" scoped>
.fund-option {
  background: rgba(146, 204, 191, 0.1);
  border: 1px solid rgba(0, 32, 38, 0.2);
  box-sizing: border-box;border-radius: 8px;
  transition: all 300ms ease-in;
  div:first-child {
    height: 44px;
    width: 44px;
  }
}

.bg-mint-lighter{
    background-color: rgba(146, 204, 191, 0.2)!important;
}

.inner-border{
  border: 2px solid rgba(146, 204, 191, 0.4);
}
</style>
