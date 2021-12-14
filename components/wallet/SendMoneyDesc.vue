<template>
  <div class="modal-content">
    <div class="modal-header px-4">
      <h5 class="modal-title">Send Money ({{formatSendingMethod}})</h5>
      <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
        <span class="ed-x fs-5"></span>
      </a>
    </div>
    <div class="modal-body">
      <div class="px-2" style="height: 24rem">
        <div class="mb-6">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <p class="mb-0 body-1">Brief Description</p>
            <small class="text-black-50">Optional</small>
          </div>
          <label class="eden-text-input">
            <textarea v-model="form.description" class="form-control w-100 text-black-50" rows="8" style="resize: none">Enter description here</textarea>
          </label>
        </div>
      </div>
    </div>
    <div class="modal-footer px-4 mb-3 justify-content-between">
            <button @click="$emit('back')" class="btn btn-sm btn-outline-eden-mint text-eden-green">
              <span class="ed-arrow-left text-eden-mint "></span>Back
            </button>
      <button @click="next" type="button" class="btn btn-sm btn-jungle-green px-5 ">Confirm</button>
    </div>
  </div>
</template>

<script>
import { numeric, email, required } from 'vuelidate/lib/validators'
export default {
  props: ["details"],
  data () {
    return {
      bank: null,
      form: {
        description: null
      }
    }
  },
  computed:  {
    formatSendingMethod() {
      return this.details.charAt(0).toUpperCase()+""+this.details.substring(1)
    }
  },
  methods: {
    next() {
      this.$emit("success", {...this.form})
    }
  }
}
</script>

<style scoped>

</style>
