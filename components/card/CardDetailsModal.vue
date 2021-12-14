<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div  class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header px-4">
          <h5 class="modal-title">Card details</h5>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div class="modal-body">
          <div v-if="card" class="px-2" style="height: 18rem">
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">Card NO.</small>
              <span class="body-1 text-jungle-green">{{ card.card_number }}</span>
            </div>
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">Expiry</small>
              <span class="body-1 text-jungle-green">{{ card.exp }}</span>
            </div>
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">CVV</small>
              <span class="body-1 text-jungle-green">{{ card.cvv }}</span>
            </div>
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">PIN</small>
              <span class="body-1 text-jungle-green">{{ card.pin }}</span>
            </div>
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">HOLDER</small>
              <span class="body-1 text-jungle-green">{{ card.card_name }}</span>
            </div>
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">CARD TYPE</small>
              <span class="body-1 text-jungle-green">{{ card.type }}</span>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-center px-4 mb-3">
          <div class="fund-option px-5 py-3">
            <img style="height: 20px" class="me-2" src="~/assets/dark-arrow.svg">
            <span class="body-1 fw-normal">Click on the fields to copy details</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['card'],
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.fund-option {
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%2392ccbf' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='3' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 8px;
  transition: all 300ms ease-in;
  div:first-child {
    height: 44px;
    width: 44px;
  }
}
</style>
