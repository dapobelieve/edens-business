<template>
  <div class="h-100 d-flex flex-column modal-body px-0">
    <div class="flex-grow-1 px-4" style="height: 24rem">
      <div class="mb-4">
        <div class="mb-2"><span class="fw-bold body-1">Enter Amount</span></div>
        <input @keyup="formatAmount"  @keyup.enter="next" ref="amount"  class="form-control" placeholder="Enter Amount">
        <small class="fs-8 text-bad-red" v-if="$v.form.amount.$error">{{amountErr}}</small>
      </div>
      <div class="mb-6">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <p class="mb-0 body-1">Brief Description</p>
          <small class="text-black-50"></small>
        </div>
        <label class="eden-text-input">
          <textarea v-model="form.description" class="form-control w-100 text-black-50" placeholder="Enter description here (optional)" rows="8" style="resize: none"></textarea>
        </label>
      </div>
    </div>
    <div class="modal-footer ms-0 px-4 justify-content-end">
      <EdenButton :disabled="loading" :loading="loading"  @click="next" type="button" class="btn btn-sm btn-jungle-green px-5">Generate Link</EdenButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { required, numeric, minValue, maxValue } from "vuelidate/lib/validators";
import EdenButton from '~/components/EdenButton'
// const minCheck = function(value) { return value >= this.min } ;
// const maxCheck = function(value) { return value <= this.max } ;
export default {
  components: { EdenButton },
  props: ['loading'],
  data() {
    return {
      form: {
        amount: null,
        description: null
      }
    }
  },
  validations: {
    form: {
      amount: {
        required,
        numeric
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
        this.$emit("generate-link", {...this.form})
      }
    }
  },
  computed: {
    ...mapGetters({
      config: "auth/getConfig"
    }),
    amountErr() {
      if (!this.$v.form.amount.required) return "Enter an amount";
      if (!this.$v.form.amount.numeric) return "Only numbers allowed";
      // if (!this.$v.form.amount.minCheck) return `Minimum value of $${this.min.toLocaleString("en-US" )}`;
      // if (!this.$v.form.amount.maxCheck) return `Maximum value of $${this.max.toLocaleString("en-US" )}`;
    },
  }
}
</script>

<style scoped>

</style>
