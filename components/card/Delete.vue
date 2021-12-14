<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header px-4">
          <h5 class="modal-title">Delete Confirmation</h5>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div class="modal-body">
          <div class="px-2" style="height: 9rem">
            <div class="d-flex justify-content-between mb-5">
              <p style="color: rgba(0, 32, 38, 0.6);">Are you sure you want to delete this card?</p>
            </div>
          </div>
        </div>
        <div class="modal-footer px-4 justify-content-between mb-3">
          <button data-bs-dismiss="modal" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
            <span class="ed-arrow-left text-eden-mint "></span>Cancel</button>
          <button type="button" class="btn btn-sm bg-bad-red text-white px-5">Yes,delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.fund-option {
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%2392ccbf' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='3' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 8px;
  transition: all 300ms ease-in;
  //&:hover {
  //  border-color: var(--bs-jungle-green);
  //}
  div:first-child {
    height: 44px;
    width: 44px;
  }
}
</style>
