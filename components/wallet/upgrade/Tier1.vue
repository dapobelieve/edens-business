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
              <div>
                <p class="text-black-50 fs-7">Upload the following documents to complete your <br> personal profile.</p>
              </div>
              <div>
                <div class="mb-4">
<!--                  <div class="mb-2"><span class="body-1 fw-bold">Upload a valid ID</span></div>-->
                  <SelectComponent @input="selectHandler" placeholder="Select ID" :options="options" />
<!--                  <small class="fs-7 text-bad-red">{{ idErr }}</small>-->
                </div>
                <div class="d-flex justify-content-between mb-3">
                  <span class="body-1 caption-2">Upload ID</span>
                  <span style="margin-right: 40px" class=" body-1 fw-normal text-black-50">PNG, JPEG, PDF</span>
                </div>
                <Uploader
                  @file-selected="identityFile=$event"
                  :queued="queued"
                  @file-removed="identityFile=null"
                  @completed="submitForm"
                  class="mb-5" :file-type="fileType"
                />
              </div>
              <div>
                <div class="mb-4">
                  <div class="mb-2"><span class="body-1 fw-bold">Enter NIM</span></div>
                  <input v-model="form.nim" placeholder="Enter NIM" type="text" class="form-control">
                  <small class="fs-8 text-bad-red" v-if="$v.form.nim.$error">{{nimErr}}</small>
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
          <EdenButton @click="submit" :loading="btn.loading" :disabled="!identityFile" class="btn btn-jungle-green btn-sm">Proceed</EdenButton>
        </div>
      </div>
</template>

<script>
import Uploader from "~/components/Uploader";
import { required, numeric } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      fileType: null,
      form: {
        nim: null
      },
      identityFile: null,
      options: [
        {
          name: 'National ID',
          value: 'national_identity_card'
        },
        {
          name: `Driver's Licence`,
          value: 'national_identity_card'
        },
        {
          name: 'International Passport',
          value: 'national_identity_card'
        }
      ],
      uploadCount: 0,
      queued: true,

      btn: {
        loading: false
      }
    }
  },
  validations: {
    form: {
      nim: { required, numeric }
    }
  },
  methods: {
    selectHandler(data) {
      this.fileType = data.value
    },
    submit() {
      this.$v.form.nim.$touch()
      if (!this.$v.$invalid) {
        this.queued = false
      }
    },
    async submitForm() {
      try {
        await this.$store.dispatch("auth/tireUpgrade", {
          nim: this.form.nim
        })
        await this.$store.dispatch("wallet/getWallet")

        let toast = new bootstrap.Toast(document.getElementById('liveToast'), {
          delay: 7000,
          animation: true,
        })

        this.$store.commit('auth/setStates', {toast: {show: true,
            data: {
              header: 'Submitted successfully',
              body: 'Your information has been submitted for review. We would get back to you in the next 48hours'
            }}})
        toast.show()
        this.close()
      }catch (e) {

      }
    },
    close() {
      let modal = bootstrap.Modal.getInstance(document.getElementById('upgrade-modal'))
      modal.hide()
    },
  },
  components: { Uploader },
  computed: {
    nimErr() {
      if (!this.$v.form.nim.required) return "Enter an nim number";
      if (!this.$v.form.nim.numeric) return "Only numbers allowed";
    },
  }
}
</script>

<style scoped>

</style>
