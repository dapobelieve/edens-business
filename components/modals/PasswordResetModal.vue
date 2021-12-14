<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div class="modal-body">
          <div class="d-flex flex-column align-items-center py-7 pt-4">
            <div class="mb-5 mt-2">
              <img src="~/assets/images/thumb-circle.png">
            </div>
            <div class="text-center">
              <h5 class="mb-3">Password successfully reset!</h5>
              <p class="mb-3">You have successfully changed your password. Please proceed to log in.</p>
            </div>
            <div class="mt-8">
              <button data-bs-dismiss="modal" class="btn btn-jungle-green">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
