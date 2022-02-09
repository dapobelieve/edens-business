<template>
    <div  class="modal-dialog modal-dialog-centered" style="max-width: 477px">
        <div class="modal-content" >
        <div class="modal-header px-4">
            <h5 class="modal-title">Summary</h5>
            <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
            </a>
        </div>
        <div class="modal-body px-4" style="height: 26rem">
            <div>
                <div class="d-flex justify-content-between mb-3">
                <span class="fs-16 fw-bolder">{{bill.name}}</span>
                </div>
            </div>

            <div class="mt-2 fund-option px-4 mb-4 d-flex py-3 align-items-center cursor-pointer">
                <div class="rounded-circle flex-shrink-0 bg-mint-lighter d-inline-flex align-items-center me-4 justify-content-center">
                    <img src="~/assets/electricity.svg">
                </div>
                <div>
                    <p class="mb-0 fw-bolder">{{provider.name}}</p>
                </div>
            </div>
            <div>
                <form class="flex-grow-1">
                  
                <div class="position-relative mb-4">
                  <span class="body-1 caption-2">Phone number</span>
                  <label class="eden-text-input" :class="[$v.form.phone_number.$error ? 'eden-text-input-error': '']">
                    <input style="padding-left: 46px" class="form-control" v-model="$v.form.phone_number.$model" />
                    <span v-if="$v.form.phone_number.$error" class="ed-x"></span>
                    <small style="top: 18px; left: 13px; font-size: 0.875rem; font-weight: 500" class="position-absolute">+231</small>
                  </label>
                  <small class="fs-7 text-bad-red" v-if="$v.form.phone_number.$error">{{phoneErr}}</small>
                 </div> 

                <div class="position-relative">
                  <span class="body-1 caption-2 mt-2">Confirm amount</span>
                  <label class="eden-text-input" :class="$v.form.amount.$error ? 'eden-text-input-error': ''">
                    <input v-model="$v.form.amount.$model" class="form-control mt-2" placeholder="Amount">
                    <span v-if="$v.form.amount.$error" class="ed-x"></span>
                  </label>
                  <small class="fs-8 text-bad-red" v-if="$v.form.amount.$error">{{amountErrs}}</small>
                </div>
                  
                </form>
            </div>

        </div>
        <!-- <div class="modal-footer ms-0 px-4 mb-3">
            <button type="button" class="btn btn-sm btn-jungle-green px-6">
                <span>Next</span>
            </button>
        </div> -->

        <div class="modal-footer ms-0 px-4 justify-content-between mb-3">
            <!-- <button @click="$emit('close-loan')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">/ -->
            <button @click="$emit('back')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
                <span class="ed-arrow-left text-eden-mint "></span>Back</button>
            <eden-button @click="next" type="button" class="btn btn-sm btn-jungle-green px-5">
                Pay now
            </eden-button>
        </div>
        </div>
    </div>
</template>

<script>
import { numeric, required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      form:{
        amount:'',
        phone_number:'',
        // bill_id: this.bill.id,
        bill_provider_id: this.provider.id
      },
      currentPage:'select-provider',
      isInputActive: false,
      error:false,
      salaryErr:'Enter an amount',
    }
  },
  props:{
    provider: Object,
    bill: Object,
  },
  validations: {
    form: {
      amount:{ required, numeric },
      phone_number: { required, numeric }
    }
  },
  computed:  {
    amountErrs() {
      if (!this.$v.form.amount.required) return "Please enter an amount"
      if (!this.$v.form.amount.numeric) return "Only numbers allowed"
    },
    phoneErr() {
      if (!this.$v.form.phone_number.required) return "Phone number is required";
      if (!this.$v.form.phone_number.numeric) return "Phone number should only contain numbers";
    }
  },
  methods:{
    async next() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("confirm-payment", {...this.form})
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.search {
    // width: 327px;
    input {
      height: 50px;
      font-weight: 400;
      font-size: 14px;
      padding-left: 12px;
    }
    span {
      right: 9px;
      top: 15px;
    }
}

.fund-option {
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%2392ccbf' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='3' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 8px;
  transition: all 300ms ease-in;
  div:first-child {
    height: 44px;
    width: 44px;
  }
}

.bg-mint-lighter{
    background-color: rgba(146, 204, 191, 0.2)!important;
}

.fs-16{
    font-size: 16px;
}

</style>