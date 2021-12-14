<template>
  <div class="modal-content">
      <div class="modal-header px-4">
        <h5 class="modal-title">Fund Wallet - Bank Transfer</h5>
        <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
          <span class="ed-x fs-5"></span>
        </a>
      </div>
      <div class="modal-body">
        <div class="px-2" style="height: 24rem">
          <div class="fund-option px-4 mb-4 d-flex py-3 align-items-center cursor-pointer">
            <div class="rounded-circle flex-shrink-0 d-inline-flex align-items-center me-4 justify-content-center">
              <img src="~/assets/bank-info.svg">
            </div>
            <div>
              <p class="mb-0 body-1 text-black-50 fw-normal">Make a Bank Transfer to the account bearing the details below. Your wallet would be funded as soon as the transfer is received.</p>
            </div>
          </div>
          <div class="border bank-details" style="border-radius: 16px">
            <div class="d-flex justify-content-between px-4 py-4">
              <p class="mb-0 caption text-black-50">ACCOUNT NO</p>
              <p class="mb-0 body-1 caption-2">359 4506 056</p>
            </div>
            <div class="d-flex justify-content-between px-4 py-4">
              <p class="mb-0 caption text-black-50">ACCOUNT NAME</p>
              <p class="mb-0 body-1 caption-2">Jessica Brownley</p>
            </div>
            <div class="d-flex justify-content-between px-4 py-4">
              <p class="mb-0 caption text-black-50">BANK</p>
              <p class="mb-0 body-1 caption-2">EDENS360</p>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer px-4 justify-content-between mb-3">
        <button @click="$emit('back')" class="btn btn-sm btn-outline-eden-mint text-eden-green">
          <span class="rrow-left text-eden-mint "></span>Back</button>
        <button data-bs-dismiss="modal" type="button" class="btn btn-sm btn-jungle-green px-5">Okay, got it</button>
      </div>
    </div>
</template>

<script>
export default {
  data (){
    return {
      fund: {
        method: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fund-option {
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%2392ccbf' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='3' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 8px;
  transition: all 300ms ease-in;
}

.bank-details {
  div:not(:last-child) {
    border-bottom: 1px solid rgba(0, 32, 38, 0.1);;
  }
}
</style>
