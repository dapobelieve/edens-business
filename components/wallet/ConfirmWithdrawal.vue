<template>
  <div class="modal-content">
    <div class="modal-header px-4">
      <h5 class="modal-title">Confirm withdrawal</h5>
      <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
        <span class="ed-x fs-5"></span>
      </a>
    </div>
    <div class="modal-body">
      <div class="px-2" style="">
        <p class="body-1 text-black-50 fw-normal">Please confirm you want to withdraw
          <span class="fw-bold text-jungle-green">{{amount}}</span> to
          <template>
            <span v-if="info.method === 'bank'" class="fw-bold text-jungle-green">{{info.account_name}} ({{info.account_number}}, {{info.bank_details.name}})</span>
            <span v-else class="fw-bold text-jungle-green">{{info.account_name}} ({{info.mobile_number}})</span>
          </template>
        </p>
      </div>
    </div>
    <div class="modal-footer px-4 mb-3 justify-content-between">
      <button @click.prevent="$emit('back')" class="btn btn-sm btn-outline-eden-mint text-eden-green">
        <span class="ed-arrow-left text-eden-mint "></span>Back
      </button>
      <eden-button :loading="btn.loading" :disabled="btn.loading" @click="next" type="button" class="btn btn-sm btn-jungle-green px-5 ">Withdraw</eden-button>
    </div>
  </div>
</template>

<script>
import EdenButton from '~/components/EdenButton'
export default {
  components: { EdenButton },
  props: ['info'],
  data () {
    return {
      btn: {loading: false},
      form: {
        description: null
      }
    }
  },
  computed: {
    amount() {
      return `${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(parseFloat(this.info.amount))}`
    }
  },
  methods: {
    next() {
      // this.btn.loading =  true
      this.$emit("success", )
    }
  },
  mounted() {
    this.btn.loading = false
  }
}
</script>

<style scoped>

</style>
