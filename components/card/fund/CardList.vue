<template>
  <div class="modal-body px-0 mb-0">
    <div class="px-2 mx-3" style="height: 24rem">
      <div class="mb-5 ">
        <p class="caption-2">Previously used cards</p>
        <div class="credit-card border p-4 d-flex">
          <div class="d-flex">
            <img src="~/assets/mastercard.svg" class="me-3">
            <div class="card-number">5669 XXXX XXXX 4536</div>
          </div>
          <div class="ms-auto">
            <span class="ed-trash text-bad-red fw-bold"></span>
          </div>
        </div>
        <div class="credit-card border p-4 d-flex">
          <div class="d-flex">
            <img src="~/assets/mastercard.svg" class="me-3">
            <div class="card-number">5669 XXXX XXXX 4536</div>
          </div>
          <div class="ms-auto">
            <span class="ed-trash text-bad-red fw-bold"></span>
          </div>
        </div>
      </div>
      <a @click.prevent="$emit('new-card')" class="flex-shrink-0 fund-option px-4 mb-6 d-flex py-4 align-items-center justify-content-center cursor-pointer">
        <div class="rounded-circle flex-shrink-0 d-inline-flex align-items-center me-2 justify-content-center">
          <img src="~/assets/add.svg">
        </div>
        <div>
          <p class="mb-0 body-1 text-jungle-green fw-bold">Use new card</p>
        </div>
      </a>
    </div>
    <div class="modal-footer px-4 pb-0 justify-content-between">
      <button @click.prevent="$emit('back')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
        <span class="ed-arrow-left text-eden-mint "></span>Back</button>
      <!--      <button data-bs-dismiss="modal" type="button" class="btn btn-sm btn-jungle-green px-5">Okay, got it</button>-->
    </div>
  </div>

</template>
<style lang="scss" scoped>
.credit-card {
  border: 1px solid rgba(0, 32, 38, 0.1);
  border-radius: 16px;
  margin-bottom: 1.5rem;
}
.fund-option {
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%2392ccbf' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='3' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 8px;
  transition: all 300ms ease-in;
}
</style>
