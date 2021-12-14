<template>
  <div class="modal-body px-0 mb-0">
    <div class="px-2" style="height: 24rem">
      <div class="px-3 mb-3">
        <h3 class="mb-4">How much would you like to fund your wallet with?</h3>
        <div>
<!--          <input @keyup.enter="next" v-model="$v.form.amount.$model" class="form-control" placeholder="Amount">-->
          <input @keyup="formatAmount"  @keyup.enter="next" ref="amount"  class="form-control" placeholder="Amount">
          <small class="fs-8 text-bad-red" v-if="$v.form.amount.$error">{{amountErr}}</small>
        </div>
      </div>
    </div>
    <div class="modal-footer px-4 pb-0 justify-content-between">
      <button @click.prevent="$emit('back')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
        <span class="ed-arrow-left text-eden-mint "></span>Back</button>
      <button @click="next" type="button" class="btn btn-sm btn-jungle-green px-5">Next</button>
    </div>
  </div>

</template>
<script>
import { required, numeric, minValue } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      form: {
        amount: null,
        formattedAmount: 0,
        formatedAmount: 0
      }
    }
  },
  validations:{
    form: {
      amount: { required, numeric, minValue: minValue(500),} //maxValue: maxValue(1000000000) }
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
        this.$emit("success", {...this.form})
      }
    },
  },
  computed: {
    amountErr() {
      if (!this.$v.form.amount.required) return "Enter an amount";
      if (!this.$v.form.amount.numeric) return "Only numbers allowed";
      if (!this.$v.form.amount.minValue) return "Minimum value of $500";
      // if (!this.$v.form.amount.maxValue) return "Maximum value of $1000 ";
    },
  }
}
</script>
<style lang="scss" scoped>
.fund-option {
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%2392ccbf' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='3' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 8px;
  transition: all 300ms ease-in;
}
</style>
