<template>
  <div class="modal-content">
    <div class="modal-header px-4">
      <h5 class="modal-title">Send Money (Bank)</h5>
      <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
        <span class="ed-x fs-5"></span>
      </a>
    </div>
    <div class="modal-body">
      <div class="px-2" style="height: 29rem">
        <div class="mb-6">
          <div class="body-1 mb-2 fw-normal">Enter amount</div>
          <label class="eden-text-input" :class="$v.form.amount.$error ? 'eden-text-input-error': ''">
            <input v-model="$v.form.amount.$model" class="form-control" placeholder="Amount">
            <span v-if="$v.form.amount.$error" class="ed-x"></span>
          </label>
          <small class="fs-8 text-bad-red" v-if="$v.form.amount.$error">{{amountErrs}}</small>
        </div>
        <div class="mb-4">
          <div class="body-1 mb-2 fw-normal">Enter Destination Bank and Account Number</div>
          <SelectComponent placeholder="Bank" v-model="bank" />
          <small class="fs-8 text-bad-red" v-if="$v.bank.$error">{{bankErrs}}</small>
        </div>
        <div class="mb-4">
          <label class="eden-text-input" :class="$v.form.account_number.$error ? 'eden-text-input-error': ''">
            <input v-model="$v.form.account_number.$model" class="form-control" placeholder="Account Number">
          </label>
          <small class="fs-8 text-bad-red" v-if="$v.form.account_number.$error">{{accErrs}}</small>
        </div>
        <div class="mb-6">
          <label class="eden-text-input" :class="$v.form.account_name.$error ? 'eden-text-input-error': ''">
            <input v-model="$v.form.account_name.$model" class="form-control" type="text" placeholder="Account name">
          </label>
          <small class="fs-8 text-bad-red" v-if="$v.form.account_name.$error">{{nameErrs}}</small>
        </div>
      </div>
    </div>
    <div class="modal-footer px-4 mb-3">
      <button @click="$emit('back')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
        <span class="ed-arrow-left text-eden-mint "></span>Back
      </button>
      <button @click="next" type="button" class="btn btn-sm btn-jungle-green px-5 ms-auto">Next</button>
    </div>
  </div>
</template>

<script>
import { numeric, email, required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      bank: null,
      form: {
        amount: null,
        bank: 1,
        account_number: null,
        account_name:null
      }
    }
  },
  validations: {
    bank:{ required },
    form: {
      amount:{ required, numeric },
      account_number:{ required, numeric },
      account_name:{ required },
    }
  },
  computed:  {
    bankErrs() {
      if (!this.$v.bank.required) return "Select your Bank"
    },
    nameErrs() {
      if (!this.$v.form.account_name.required) return "Account name required"
    },
    amountErrs() {
      if (!this.$v.form.amount.required) return "Please enter an amount"
      if (!this.$v.form.amount.numeric) return "Only numbers allowed"
    },
    accErrs() {
      if (!this.$v.form.account_number.required) return "Account Number required"
      if (!this.$v.form.account_number.numeric) return "Only numbers allowed"
    },
  },
  methods: {
    next() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("success", {...this.form, bank_details: this.bank})
      }
    }
  }
}
</script>
