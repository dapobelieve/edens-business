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
                  <SelectComponent placeholder="Select ID" :options="options" v-model="option" />
                </div>
                <div class="d-flex justify-content-between mb-3">
                  <span class="body-1 caption-2">Upload ID</span>
                  <span style="margin-right: 40px" class=" body-1 fw-normal text-black-50">PNG, JPEG, PDF</span>
                </div>
                <Uploader :queued="queued" @file-removed="uploadCount-=1" @upload-complete="uploadCount+=1" class="mb-5" file-type="valid_id" />
              </div>
              <div>
                <div class="mb-4">
                  <div class="mb-2"><span class="body-1 fw-bold">Upload a valid ID</span></div>
                  <input v-model="form.nim" placeholder="Enter NIM" type="text" class="form-control">
                </div>
              </div>
        </div>
        <div class="d-flex justify-content-between pt-6 mb-4">
          <button class="btn btn-outline-eden-mint px-3 me-3" @click.prevent="$emit('back')">
            <span class="ed-arrow-left"></span>Back</button>
          <eden-button :disabled="btn.loading" :loading="btn.loading" class="btn btn-jungle-green" @click.prevent="sendOtp">{{ btn.text }}</eden-button>
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
      btn: {
        loading:false,
        text: 'Proceed'
      },
      verifyPhone: false,
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
    }
  },
  validations:{
    form: {
      phone_number: { required, numeric }
    }
  },
  computed: {
    phoneErr() {
      if (!this.$v.form.phone_number.required) return "Phone number is required";
      if (!this.$v.form.phone_number.numeric) return "Phone number should only contain numbers";
    }
  },
  methods: {
    async sendOtp() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          this.btn.loading = true
          if (this.form.phone_number) {
            let res = await this.$axios.post('internals/otp', { ...this.form, type: 'phone' })
            // alert("OTP sent")
            this.verifyPhone = true
          }
        } catch (e) {
          this.error = e.response.data.message
        }finally {
          this.btn.loading = false
          this.btn.text = 'Proceed'
        }
      }
    },
  }
}
</script>
