<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="">Update Branch</h6>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div class="modal-body" v-if="form">
          <div class="px-sm-2" style="height: 20rem">
            <div class="mt-2">
              <div class="d-flex flex-column justify-content-center align-items-center w-100">
                <div class="mb-4 w-100">
                  <div class="mb-2"><span class="fw-bold body-1">Branch name</span></div>
                  <label class="eden-text-input" :class="$v.form.name.$error ? 'eden-text-input-error': ''">
                    <input placeholder="Branch name" type="text" class="form-control" v-model="$v.form.name.$model">
                    <span v-if="$v.form.name.$error" class="ed-x"></span>
                  </label>
                  <small class="fs-7 text-bad-red" v-if="$v.form.name.$error">{{nameErr}}</small>
                </div>

                <div class="mb-4 w-100">
                  <div class="mb-2"><span class="fw-bold body-1">Branch Address</span></div>
                  <label class="eden-text-input" :class="$v.form.address.$error ? 'eden-text-input-error': ''">
                    <input placeholder="Enter Address" type="text" class="form-control" v-model="$v.form.address.$model">
                    <span v-if="$v.form.address.$error" class="ed-x"></span>
                  </label>
                  <small class="fs-7 text-bad-red" v-if="$v.form.address.$error">{{addressErr}}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <EdenButton @click="send" :loading="loading" class="btn btn-jungle-green btn-sm">Update Branch</EdenButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      form: {...this.details},
      btn: {
        loading: false
      },
    }
  },
  props:{
      details: Object,
      loading: Boolean
  },
  validations: {
    form: {
      name:{ required },
      address: { required }
    }
  },
  computed:  {
    nameErr() {
      if (!this.$v.form.name.required) return "Please enter the name of the branch"
    },
    addressErr() {
      if (!this.$v.form.address.required) return "Please enter the address";
    },
    // edited() {
    //   return (
    //     Object.entries(this.userData).toString() === Object.entries(this.form).toString()
    //   )
    // }
  },
  watch:{
    'details':{
        immediate: true,
        handler(newVal){
            console.log(newVal)
            this.form = {...newVal}
        }
    }   
  },
  methods: {
    async send() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('update-branch', this.form)
      }
    },
    close() {
      let modal = bootstrap.Modal.getInstance(document.getElementById('invite-branch'))
      modal.hide()
    },
    
  },
  mounted() {
    // this.form = JSON.parse(JSON.stringify(this.details))
    this.userData = JSON.parse(JSON.stringify(this.details))
  }
}
</script>

<style lang="scss" scoped>
::v-deep .user-avatar {
  div {
    div {
      height: 68px !important;
      width: 68px !important;
      font-size: 30px;
    }
  };
}
.bank-details {
  div:not(:last-child) {
    border-bottom: 1px solid rgba(0, 32, 38, 0.1);;
  }
}
.selected-fund-method {
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23002026' stroke-width='2' stroke-dasharray='13%2c 15%2c 12%2c 14' stroke-dashoffset='22' stroke-linecap='round'/%3e%3c/svg%3e");
}
</style>
