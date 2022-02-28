<template>
  <div>
    <template>
      <h3 class="mt-4">Upload Documents</h3>
      <p class="mt-1 mb-5 body-1 fw-normal">Upload your Identifications</p>
      <div v-if="error" class="alert alert-danger mb-3 mt-3" role="alert">
        {{ error }}
      </div>
      <form class="flex-grow-1">
        <div class="mb-4">
           <div>
                <div class="mb-4">
                  <SelectComponent @input="selectHandler" placeholder="Select ID" :options="options" v-model="option" />
                </div>
                <div class="d-flex justify-content-between mb-3">
                  <span class="body-1 caption-2">Upload ID</span>
                  <span style="margin-right: 40px" class=" body-1 fw-normal text-black-50">PNG, JPEG, PDF</span>
                </div>
             <Uploader
               @file-selected="identityFile=$event"
               :queued="queued"
               @file-removed="identityFile=null"
               @completed="fileUploaded"
               class="mb-5" :file-type="form.identification_name"
             />
              </div>
              <div>
                <div class="mb-4">
                  <div class="mb-2"><span class="body-1 fw-bold">Enter NIM</span></div>
                  <input v-model="form.nim" placeholder="Enter NIM" type="text" class="form-control">
                  <small class="fs-8 text-bad-red" v-if="$v.form.nim.$error">{{nimErr}}</small>
                </div>
              </div>
        </div>
        <div class="d-flex justify-content-between pt-6 mb-4">
          <button class="btn btn-outline-eden-mint px-3 me-3" @click.prevent="$emit('back')">
            <span class="ed-arrow-left"></span>Back</button>
          <eden-button :disabled="!identityFile" :loading="btn.loading" class="btn btn-jungle-green" @click.prevent="submit">{{ btn.text }}</eden-button>
        </div>
      </form>
    </template>
  </div>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";
import Uploader from "~/components/Uploader";
import EdenButton from '~/components/EdenButton'
export default {
  components: { EdenButton, Uploader },
  data ()  {
    return {
      error: null,
      uploadedUrl: null,
      option: null,
      btn: {
        loading:false,
        text: 'Proceed'
      },
      identityFile: null,
      form: {
        identification_file_url: null,
        identification_name: null,
        nim: null
      },
      options: [
        {
          name: 'National ID',
          value: 'national_identity_card'
        },
        {
          name: `Driver's Licence`,
          value: 'driver_licence'
        },
        {
          name: 'International Passport',
          value: 'national_identity_card'
        }
      ],
      uploadCount: 0,
      queued: true,
    }
  },
  validations:{
    form: {
      nim: { required, numeric }
    }
  },
  computed: {
    nimErr() {
      if (!this.$v.form.nim.required) return "Enter your nim number";
      if (!this.$v.form.nim.numeric) return "Only numbers allowed";
    },
  },
  methods: {
    submit() {
      this.$v.form.nim.$touch()
      if (!this.$v.$invalid) {
        this.queued = false
      }
    },
    fileUploaded(data) {
      this.form.identification_file_url = data.url
      this.$emit('success', this.form)
    },
    selectHandler(data) {
      this.form.identification_name = data.value
    }
  }
}
</script>
