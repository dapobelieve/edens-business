<template>
  <div class="modal-content border-0">
    <div class="modal-header px-4">
      <h5 class="modal-title">Confirm loan request</h5>
      <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
        <span class="ed-x fs-5"></span>
      </a>
    </div>
    <div class="modal-body">
    <div class="" style="height: 30rem">
      <!-- <p class="text-black-50 ms-3">Confirm loan request.</p> -->
      <div class="px-lg-3 pt-5">
        <div class="border border-card rounded" style="">
          <div>
            <div class="py-4 d-flex flex-column align-items-center border-bottom">
              <div style="height: 3px; width: 25px; border-radius: 1.5px" class="bg-blue-green mb-1 border-0"></div>
              <span class="caption-2 text-black-50 mb-1">Loan amount</span>
              <p class="caption-2 text-eden-green m-0 p-0">${{formatAmount}}</p>
            </div>
          </div>
          <div class="py-4 d-flex flex-column align-items-center border-bottom">
            <div style="height: 3px; width: 25px; border-radius: 1.5px" class="bg-lavender-floral mb-1 border-0"></div>
            <span class="caption-2 text-black-50 mb-1">Payback Duration</span>
            <p class="caption-2 text-eden-green m-0 p-0">{{ form.duration }} Months</p>
          </div>
          <div class="py-4 d-flex  flex-column align-items-center border-bottom">
            <div style="height: 3px; width: 25px; border-radius: 1.5px" class="bg-inch-worm mb-1 border-0"></div>
            <span class="caption-2 text-black-50 mb-1">Payback plan</span>
            <p class="caption-2 text-eden-green m-0 p-0">${{ paybackAmount }}/ <small class="fs-8 text-black-50">month</small></p>
          </div>
          <div class="py-4 d-flex interest-section justify-content-center align-items-center">
            <div class="d-flex align-items-center justify-content-center px-3 py-1">
              <div class="me-3 rounded-circle d-inline-flex justify-content-center align-items-baseline"><span class="ed-percent fw-bold fs-7 text-eden-mint"></span></div>
              <div class="text-jungle-green d-inline-flex align-items-baseline"><span class="me-2">Interest at</span> <small class="fw-bold fs-6">{{config.interest}}%</small></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-footer px-4 justify-content-between mb-3">
    <button @click="$emit('back')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
      <span class="ed-arrow-left text-eden-mint "></span>Back</button>
    <EdenButton @click.prevent="$emit('success')" :loading="btn.loading" :disabled="btn.loading" type="button" class="btn btn-sm btn-jungle-green px-">Send Request</EdenButton>
  </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  props:  ['form', 'btn'],
  data() {
    return {
      config: {
        interest: 10
      }
    }
  },
  computed: {
    ...mapGetters({
      // config: "auth/getConfig"
    }),
    formatAmount() {
      return new Intl.NumberFormat('en-US').format(parseFloat(this.form.amount))
    },
    paybackAmount() {
      return new Intl.NumberFormat('en-US').format(parseFloat(this.form.amount/this.form.duration))
    }
  }
}
</script>

<style scoped>
  .border-bottom{
    border-bottom: 1px solid rgba(0, 32, 38, 0.1);
  }
</style>
