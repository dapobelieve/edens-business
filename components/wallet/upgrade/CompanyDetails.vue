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
          <div class="mb-3">
            <p class="text-black-50 fs-7">Upload the following documents to complete your <br> personal profile.</p>
          </div>
          <div>
            <div class="d-flex justify-content-between mb-3">
              <span class="body-1 caption-2">Article of incorporation</span>
              <span style="margin-right: 40px" class=" body-1 fw-normal text-black-50">PNG, JPEG, PDF</span>
            </div>
            <Uploader :queued="queued" @file-removed="uploadCount-=1" @upload-complete="uploadCount+=1" class="mb-5" file-type="valid_id" />
          </div>
          <div>
            <div class="mb-4">
<!--              <div class="mb-2"><span class="body-1 fw-bold">Enter NIM</span></div>-->
              <input v-model="form.business " placeholder=" Business Registration Number" type="text" class="form-control">
            </div>
            <div class="mb-4">
              <!--              <div class="mb-2"><span class="body-1 fw-bold">Enter NIM</span></div>-->
              <input v-model="form.tin " placeholder="Tax Identification Number" type="text" class="form-control">
            </div>
            <!--                <div class="d-flex justify-content-between mb-3">-->
            <!--                  <span class="body-1 caption-2">Proof of Address (Optional)</span>-->
            <!--                  <span style="margin-right: 40px" class=" body-1 fw-normal text-black-50">PNG, JPEG, PDF</span>-->
            <!--                </div>-->
            <!--                <Uploader :queued="queued" @file-removed="uploadCount-=1" @upload-complete="uploadCount+=1" class="mb-5" file-type="proof_of_address" />-->
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <EdenButton @click="upload" :loading="btn.loading" :disabled="uploadCount !== 1 && !form.nim" class="btn btn-jungle-green btn-sm">Proceed</EdenButton>
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
      options: [
        {
          name: 'NIN',
          value: 'nin'
        },
        {
          name: 'National ID',
          value: 'national'
        },
        {
          name: 'International Passport',
          value: 'ip'
        }
      ],
      uploadCount: 0,
      queued: true,
      btn: {
        loading: false
      }
    }
  },
  methods: {
    upload() {
      this.btn.loading = !this.btn.loading;
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
