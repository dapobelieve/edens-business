<template>
  <div class="modal-content border-0">
    <div class="modal-header px-4">
      <h5 class="modal-title">Request Loan</h5>
      <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
        <span class="ed-x fs-5"></span>
      </a>
    </div>
    <div class="modal-body px-0 d-flex flex-column" style="height: 26rem">
      <div class="flex-grow-1 px-4">
        <h3 class="mb-4">How much would you like <br>to loan?</h3>
        <div>
          <input @keyup="formatAmount" @keyup.enter="next" ref="amount"  class="form-control" placeholder="Loan Amount">
          <small class="fs-8 text-bad-red" v-if="$v.form.amount.$error">{{amountErr}}</small>
        </div>
      </div>
    </div>
    <div class="modal-footer ms-0 px-4 justify-content-between mb-3">
      <button @click="$emit('back')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
        <span class="ed-arrow-left text-eden-mint "></span>Back</button>
      <button @click="next" type="button" class="btn btn-sm btn-jungle-green px-5">Next</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { required, numeric, minValue, maxValue } from "vuelidate/lib/validators";
const minCheck = function(value) { return value >= this.min } ;
const maxCheck = function(value) { return value <= this.max } ;
export default {
  data() {
    return {
      config: {
        minimum_loan_amount: 50000,
        maximum_loan_amount: 20000000,
      },
      form: {
        amount: null
      }
    }
  },
  validations: {
    form: {
      amount: {
        required,
        numeric,
        minCheck,
        maxCheck
      }
    }
  },
  methods: {
    formatAmount(e) {
      if([38,40,37,39].includes(e.keyCode)) return;
      let input = e.target.value.replace(/[\D\s\._\-]+/g, "");
      input = input ? parseInt( input, 10 ) : 0;

      this.form.amount = input
      e.target.value =  ( input === 0 ) ? "" : input.toLocaleString("en-US" );
      this.$v.form.amount.$touch()
    },
    next() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("loan-proceed", {...this.form})
      }
    }
  },
  computed: {
    ...mapGetters({
      // config: "auth/getConfig"
    }),
    min() {
      return parseInt(this.config.minimum_loan_amount/100)
    },
    max() {
      return parseInt(this.config.maximum_loan_amount/100)
    },
    amountErr() {
      if (!this.$v.form.amount.required) return "Enter an amount";
      if (!this.$v.form.amount.numeric) return "Only numbers allowed";
      if (!this.$v.form.amount.minCheck) return `Minimum value of $${this.min.toLocaleString("en-US" )}`;
      if (!this.$v.form.amount.maxCheck) return `Maximum value of $${this.max.toLocaleString("en-US" )}`;
    },
  }
}
</script>

<style scoped>

</style>
