<template>
  <div class="modal-content border-0">
    <div class="modal-header px-4">
      <h5 class="modal-title">Request Loan</h5>
      <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
        <span class="ed-x fs-5"></span>
      </a>
    </div>
    <div class="modal-body px-0 d-flex flex-column" style="height: 26rem">
      <div class="flex-grow-1 px-3">
        <h3 class="mb-4">How long would you like this loan to span ?</h3>
        <div>
         <SelectComponent :options="durations" v-model="duration" placeholder="Loan duration"  />
          <small class="fs-8 text-bad-red" v-if="$v.duration.$error">{{amountErr}}</small>
        </div>
      </div>
    </div>
    <div class="modal-footer px-4 justify-content-between mb-3">
      <button @click="$emit('back')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
        <span class="ed-arrow-left text-eden-mint "></span>Back</button>
      <button @click="next" type="button" class="btn btn-sm btn-jungle-green px-5">Next</button>
    </div>
    </div>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      durations: [],
      duration: null,
      form: {
        duration: 0
      }
    }
  },
  watch: {
    duration(newVal) {
      this.form.duration = parseInt(newVal.value)
    }
  },
  validations:{
    duration: { required },
  },
  methods: {
    range(start, end, length = end - start + 1) {
      return Array.from({ length }, (_, i) => start + i)
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
      config: "auth/getConfig"
    }),
    amountErr() {
      if (!this.$v.duration.required) return "Select a duration";
    },
  },
  mounted() {
    // this.durations = this.range(this.config.minimum_loan_duration, this.config.maximum_loan_duration).reduce((acc, item) => {
    this.durations = this.range(6, 12).reduce((acc, item) => {
      acc.push({name: `${item} Months`, value: item})
      return acc
    }, [])
  }
}
</script>

<style scoped>

</style>
