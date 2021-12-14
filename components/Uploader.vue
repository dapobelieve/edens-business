<template>
  <div class="d-flex align-items-center">
    <form enctype="multipart/form-data" novalidate :class="[fileObj ? 'upload-section-active' : '', error.state ? 'upload-section-error' : '']"
          class="upload-section rounded-1 d-flex flex-grow-1 me-3 position-relative ">
      <template v-if="!fileObj">
        <div class="w-100 p-4">
          <div class="d-flex align-items-center mb-2">
            <div>
              <span class="ed-upload-cloud fw-bold me-2"></span>
              <span class="caption-2">Drag & drop here</span>
            </div>
            <span class="text-black-50 fs-8 ms-auto">Max Size: 2MB</span>
          </div>
          <div>
            <span class="text-black-50 fs-8 me-2">OR</span>
            <span class="fs-7 caption-2 ms-auto text-decoration-underline">Browse files</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="w-100 p-4">
          <div class="d-flex align-items-center mb-2">
            <div>
              <span class="ed-upload-cloud fw-bold me-2"></span>
              <span class="caption-2">{{ uploadText }}</span>
            </div>
            <span v-if="outerProgress" class="fs-8 ms-auto caption-2 d-inline-flex justify-content-center align-items-center" style="height: 19px; width: 34px; background: rgba(0, 32, 38, 0.02)">
                 {{progressUse}} %
            </span>
            <span v-else class="fs-8 ms-auto caption-2 d-inline-flex justify-content-center align-items-center" style="height: 19px; width: 34px; background: rgba(0, 32, 38, 0.02)">
                {{ fileObj.progress }}%
            </span>

          </div>
          <div class="d-flex justify-content-between">
            <span style="word-break: break-all; max-width: 250px;color: rgba(0, 32, 38, 0.6)" class="caption-2 fs-8 me-2 overflow-hidden">{{ fileName }}</span>
            <span class="caption-1 text-black-50 fs-8">{{ sizeInBytes }}MB</span>
            <span class="fs-7 caption-2 ms-auto text-decoration-underline">Browse files</span>
          </div>
        </div>
      </template>
      <input :disabled="disableUpload" @change="handleFile" ref="file" type="file" accept="application/pdf, image/jpg, image/jpeg, image/png" class="position-absolute top-0 left-0 h-100 w-100 cursor-pointer">
    </form>
    <div :class="[fileObj ? 'border-bad-red' : '']" class="cancel-upload d-inline-flex justify-content-center align-items-center rounded-circle">
      <span :class="[fileObj ? 'text-bad-red' : 'text-light-grey']" @click="removeFile" class="ed-x fs-4 fw-bold cursor-pointer"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["fileType", "queued", "outerProgress"],
  data() {
    return {
      fileObj: null,
      out_progress: '',
      uploadComplete: false,
      disableUpload: false,
      source: null,
      error: {
        state: false,
        text: ""
      }
    }
  },
  watch: {
    async 'queued' (queued) {
      if(!queued) {
        try {
          await this.startUpload()
        }catch (e) {
          if (this.$axios.isCancel(e)) {
            console.log("Upload cancelled by user")
          }else {
            this.disableUpload  = true
            this.error.state = true
            this.error.text = e.message
          }
        }
      }
    },
    async 'fileObj.progress' (progress) {
      this.$emit('progress', )
    }
  },
  computed: {
    fileName() {
      if(this.fileObj) {
        return this.error.state ? this.error.text : this.fileObj.file.name
      }
    },
    uploadText() {
      return this.uploadComplete ? 'Document uploaded' : 'Uploading'
    },
    sizeInBytes() {
      if(this.fileObj) {
        return (this.fileObj.file.size / 1000000).toFixed(2);
      }
    },

    progressUse() {
      if(this.outerProgress){
        this.out_progress = this.outerProgress
        return this.out_progress
      }
    }
  },
  methods: {
    async handleFile(e) {
      this.fileObj = {file: e.target.files[0], name: this.fileType, progress: 0}
        if((this.fileObj.file.size/1024/1024) > 2) {
          this.error.text = "File too large"
          this.error.state = true
          this.disableUpload = true
          this.uploadComplete = false;
          // this.$emit('upload-complete')
        }else {
          this.$emit('upload-complete')
          this.$emit('receive-file', this.fileObj.file, this.fileType)
          this.uploadComplete = true;
          this.disableUpload = true;
        }
    },
    async startUpload() {
      this.$emit("uploading")
       return await this.$axios.$post('/file/upload', this.makeFormData(), {
          onUploadProgress: (e) => {
            this.fileObj.progress = Math.round((e.loaded * 100) / e.total)
          },
          cancelToken: this.source.token
        })
      },
    removeFile() {
      this.source.cancel();
      this.source = this.$axios.CancelToken.source();
      this.$refs['file'].value = ""
      this.fileObj = null
      this.progress = 0
      this.out_progress = 0
      this.error.state = false
      // this.uploadComplete  = false
      this.disableUpload  = false;
      this.$emit('file-removed');
    },
    makeFormData() {
      const form = new FormData();
      form.append('file_type', `${this.fileType}`)
      form.append('file', this.fileObj.file)
      return form
    }
  },
  created() {
    this.$once('hook:destroyed', () => {
      this.fileObj = null
    })
    this.source = this.$axios.CancelToken.source();
  }
}
</script>

<style lang="scss" scoped>
.cancel-upload {
  height: 25px;
  width: 25px;
  border: 2px solid var(--bs-light-grey);
  padding: 12px;
}
.upload-section {
  border-radius: 8px;
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%230020267d' stroke-width='3' stroke-dasharray='13%2c 15%2c 12%2c 14' stroke-dashoffset='22' stroke-linecap='round'/%3e%3c/svg%3e");
  transition: all 300ms ease-in;
  background-color: rgba(146, 204, 191, 0.1);

  &-active {
    border: 2px solid var(--bs-eden-mint) !important;
    background: none;
  }

  &-error {
    border: 2px solid var(--bs-bad-red) !important;
    background: none;
  }

  input[type=file] {
    opacity: 0;
    //display: none;
  }
}
</style>
