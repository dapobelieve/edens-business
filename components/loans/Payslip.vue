<template>
  <div class="modal-content border-0">
    <div class="modal-header px-4">
      <h5 class="modal-title">Request Loan</h5>
      <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
        <span class="ed-x fs-5"></span>
      </a>
    </div>
    <div class="modal-body" style="height: 26rem">
      <div class="flex-grow-1 px-2">
        <div class="mb-5">
          <h4 class="mb-4">Upload last current Payslip.</h4>
          <p class="fs-7 text-black-50">This is optional but your loan would be approved <br> faster if you made the upload.</p>
        </div>
        <div>
          <div class="d-flex justify-content-between mb-3">
            <span class="body-1 caption-2">Pay Slip</span>
            <span style="margin-right: 40px" class=" body-1 fw-normal text-black-50">PNG, JPEG, PDF</span>
          </div>
          <Uploader :queued="queued" @file-removed="uploadCount-=1" @upload-complete="uploadCount+=1" class="mb-5" file-type="national_identity_card" />
        </div>
      </div>
    </div>
    <div class="modal-footer ms-0 px-4 justify-content-between mb-3">
      <button @click="$emit('back')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
        <span class="ed-arrow-left text-eden-mint "></span>Back</button>
      <eden-button :disabled="uploadCount !== 1" @click="$emit('loan-proceed')" type="button" class="btn btn-sm btn-jungle-green px-5">
        Next
      </eden-button>
    </div>
  </div>
</template>

<script>
export default{
  data() {
    return {
      uploadCount: 0,
      queued: true,
    }
  },
}

</script>

<style lang="scss" scoped>


</style>
