<template>
  <div class="modal-content">
    <div class="modal-header px-4">
      <h5 class="modal-title">Send Money (Eden)</h5>
      <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
        <span class="ed-x fs-5"></span>
      </a>
    </div>
    <div class="modal-body">
      <div class="px-2" style="height: 29rem">
        <div class="mb-4">
          <div class="body-1 mb-2 fw-normal">Enter amount</div>
          <label class="eden-text-input" :class="$v.form.amount.$error ? 'eden-text-input-error': ''">
            <input v-model="$v.form.amount.$model" class="form-control" placeholder="Amount">
            <span v-if="$v.form.amount.$error" class="ed-x"></span>
          </label>
          <small class="fs-8 text-bad-red" v-if="$v.form.amount.$error">{{amountErrs}}</small>
        </div>
        <div class="mb-2">
          <div class="body-1 mb-2 fw-normal">Enter Destination Account Number</div>
        </div>
        <div class="mb-4">
          <label class="eden-text-input" :class="$v.form.destination_account_number.$error ? 'eden-text-input-error': ''">
            <input v-model="$v.form.destination_account_number.$model" class="form-control" placeholder="Account Number">
          </label>
          <small class="fs-8 text-bad-red" v-if="$v.form.destination_account_number.$error">{{accErrs}}</small>
        </div>
        <!-- <div class="mb-4">
          <label class="eden-text-input" >
            <input v-model="form.account_name" class="form-control" type="text" placeholder="Account name" disabled>
          </label>
        </div> -->

        <div class="mb-6">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <p class="mb-0 body-1">Brief Description</p>
            <small class="text-black-50">Optional</small>
          </div>
          <label class="eden-text-input">
            <textarea v-model="form.description" class="form-control w-100 text-black-50" rows="4" style="resize: none">Enter description here</textarea>
          </label>
        </div>
      </div>
    </div>
    <div class="modal-footer px-4 mb-3">
      <button @click="$emit('back')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
        <span class="ed-arrow-left text-eden-mint "></span>Back
      </button>
      <button @click="next" :disabled="loading" type="button" class="btn btn-sm btn-jungle-green px-5 ms-auto">
        <loader v-if="loading" class="ms-1" />
        <span v-else class="fs-7 me-sm-0">
            Next
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { numeric, email, required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      bank: null,
      loading: false,
      form: {
        amount: null,
        destination_account_number: null,
        description:''
      }
    }
  },
  validations: {
    form: {
      amount:{ required, numeric },
      destination_account_number:{ required, numeric },
    }
  },
  computed:  {
    amountErrs() {
      if (!this.$v.form.amount.required) return "Please enter an amount"
      if (!this.$v.form.amount.numeric) return "Only numbers allowed"
    },
    accErrs() {
      if (!this.$v.form.destination_account_number.required) return "Account Number required"
      if (!this.$v.form.destination_account_number.numeric) return "Only numbers allowed"
    },
  },
  methods: {
    async next() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
          console.log('Clicked')
        this.loading = true
      try {
        let res = await this.$axios.$get(`account/name/${this.form.destination_account_number}`)
        this.form.account_name = res.name
      }
      catch (e) {
        let toast = new bootstrap.Toast(document.getElementById('liveToast'), {
          delay: 7000,
          animation: true,
        })
        this.$store.commit('auth/setStates', {toast: {show: true,
            data: {
              header: 'Ooops!',
              body: `${e.message}`
            }}})
        toast.show()
        this.error = e.message
      }
      finally {
        this.loading= false;
        this.$emit("success", {...this.form})
      }
      }
    }
  }
}
</script>
