<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content px">
        <div class="modal-header px-4">
          <h5 class="modal-title">Request Money</h5>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <RequestAmount v-if="tab === 'REQUEST_AMOUNT'" @generate-link="tab = 'REQUEST_SUMMARY'; form = {...form, ...$event}" />
        <RequestMoneySummary :form="form" v-else-if="tab = 'REQUEST_SUMMARY'" />
      </div>
    </div>
  </div>
</template>

<script>
import RequestAmount from '~/components/wallet/request-money/RequestAmount'
import RequestMoneySummary from '~/components/wallet/request-money/RequestMoneySummary'
export default {
  components: { RequestMoneySummary, RequestAmount },
  data () {
    return {
      tab: "REQUEST_AMOUNT",
      form: {},
      fund: {
        method: ''
      }
    }
  },
  methods: {
    close() {
      let modal = bootstrap.Modal.getInstance(document.getElementById('request-money-modal'))
      modal.hide()
    }
  },
  mounted() {
    let modal = document.getElementById("request-money-modal")
    modal.addEventListener('hidden.bs.modal', () => {
      this.form = {};
      this.tab = 'REQUEST_AMOUNT'
    })

    this.$once('hook:destroyed', () => {
      window.removeEventListener('hidden.bs.modal', ()=> {})
    })
  }
}
</script>

<style lang="scss" scoped>
.fund-option {
  border-radius: 8px;
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%2392ccbf' stroke-width='2' stroke-dasharray='13%2c 15%2c 12%2c 14' stroke-dashoffset='22' stroke-linecap='round'/%3e%3c/svg%3e");
  transition: all 300ms ease-in;
  div:first-child {

    height: 44px;
    width: 44px;
  }
}
.selected-fund-method {
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23002026' stroke-width='2' stroke-dasharray='13%2c 15%2c 12%2c 14' stroke-dashoffset='22' stroke-linecap='round'/%3e%3c/svg%3e");
}
</style>
