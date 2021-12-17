<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="">Add a Branch</h6>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div class="modal-body">
          <div class="px-sm-2" style="height: 20rem">
            <div class="mt-2">
              <div class="d-flex flex-column justify-content-center align-items-center w-100">
                <div class="mb-4 w-100">
                  <div class="mb-2"><span class="fw-bold body-1">Branch name</span></div>
                  <input placeholder="Branch name" type="text" class="form-control">
                </div>

                <div class="mb-4 w-100">
                  <div class="mb-2"><span class="fw-bold body-1">Branch Address</span></div>
                  <input placeholder="Enter Address" type="text" class="form-control">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <EdenButton @click="send" :loading="btn.loading" class="btn btn-jungle-green btn-sm">Save Branch</EdenButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import InviteDirector from '~/components/wallet/upgrade/InviteDirector'
export default {
  components: { InviteDirector },
  data () {
    return {
      form: {},
      btn: {
        loading: false
      },
    }
  },
  methods: {
    send() {
      setTimeout(() => {

      })
    },
    close() {
      let modal = bootstrap.Modal.getInstance(document.getElementById('invite-hr'))
      modal.hide()
    }
  },
  mounted() {
    this.userData = Object.assign({}, this.$store.state.auth.user)
    let modal = document.getElementById("invite-hr")
    modal.addEventListener('hidden.bs.modal', () => {
      this.showFundingOptions = true
    })

    this.$once('hook:destroyed', () => {
      window.removeEventListener('hidden.bs.modal', ()=> {})
    })
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
