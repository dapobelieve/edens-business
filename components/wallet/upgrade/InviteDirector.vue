<template>
  <div class="modal-content">
    <div class="modal-header">
      <h6 class="">Complete your company profile.</h6>
      <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
        <span class="ed-x fs-5"></span>
      </a>
    </div>
    <div class="modal-body">
      <div class="ps-2" style="height: 30rem">
        <div class="mt-2">
          <div class="d-flex flex-column justify-content-center align-items-center w-100">
            <div class="mb-4">
              <img style="width: 55px" src="~/assets/images/invite.svg">
            </div>
            <h5 class="mb-3">Invite Directors</h5>
            <p class="text-black-50 text-center">Please invite your company’s directors to <br> register on Eden360 </p>
            <div class="mb-4 w-100">
              <input v-model="form.email " placeholder="Enter email address" type="text" class="form-control">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <EdenButton @click="send" :loading="btn.loading" class="btn btn-jungle-green btn-sm">Send Invite</EdenButton>
    </div>
  </div>
</template>

<script>
import Uploader from "~/components/Uploader";
export default {
  data() {
    return {
      option: null,
      form: {
        nim: null
      },
      uploadCount: 0,
      queued: true,
      btn: {
        loading: false
      }
    }
  },
  methods: {
    send() {
      setTimeout(() => {
        this.btn.loading = !this.btn.loading;
        this.$emit('proceed')
      }, 5000)
    },
    close() {
      let modal = bootstrap.Modal.getInstance(document.getElementById('upgrade-modal'))
      modal.hide()
    },
  },
  mounted() {
    // this.upload()
  },
  components: { Uploader }
}
</script>

<style scoped>

</style>
