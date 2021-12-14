<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <InviteDirector />
    </div>
  </div>
</template>

<script>

import InviteDirector from '~/components/wallet/upgrade/InviteDirector'
export default {
  components: { InviteDirector },
  data () {
    return {
      userData: {},
      step: 3,
      showAccountUpgrade: false,
      fund: {
        method: ''
      }
    }
  },
  methods: {
    close() {
      let modal = bootstrap.Modal.getInstance(document.getElementById('upgrade-modal'))
      modal.hide()
    }
  },
  mounted() {
    this.userData = Object.assign({}, this.$store.state.auth.user)
    let modal = document.getElementById("upgrade-modal")
    modal.addEventListener('hidden.bs.modal', () => {
      this.fund.method = null
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
