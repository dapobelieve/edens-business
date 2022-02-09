<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div v-if="step === 1" class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="">HR Invite</h6>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div class="modal-body">
          <div class="ps-2" style="height: 30rem">
            <div class="mt-2">
              <div class="d-flex flex-column justify-content-center align-items-center w-100">
                <div class="mb-4">
                  <img style="width: 55px" src="~/assets/images/hr.svg">
                </div>
                <h5 class="mb-3">Invite HR Members</h5>
                <p class="text-black-50 text-center">Please invite your company’s HR Members to <br> register on Eden360 </p>
                <div class="mb-4 w-100">
                  <label class="eden-text-input" :class="[$v.form.invitee_email.$error ? 'eden-text-input-error': '']">
                    <input v-model="$v.form.invitee_email.$model"  placeholder="Enter email address" type="text" class="form-control">
                    <span v-if="$v.form.invitee_email.$error" class="ed-x"></span>
                  </label>
                  <small class="fs-7 text-bad-red" v-if="$v.form.invitee_email.$error">{{emailErr}}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <EdenButton @click="next" class="btn btn-jungle-green btn-sm">Next</EdenButton>
        </div>
      </div>
    </div>
    <div v-else class="modal-dialog modal-dialog-centered">
      <div v-if="branchList && branchList.length > 0"  class="modal-content" >
        <div class="modal-header">
          <h6 class="">Branch</h6>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div class="modal-body px-4" style="height: 30rem">
          <div class="ms-auto">
            <div>
                <form class="search position-relative">
                    <input name='search-records' type='search' autocomplete='randomstring' class="form-control" placeholder="Search Branch" v-model="search">
                    <span class="ed-search cursor-pointer text-eden-mint position-absolute"></span>
                </form>
            </div>

              <small class="fs-7 text-bad-red" v-if="error">{{error}}</small>

            <div class="mt-2">
              <div class="overflow-scroll" style="height: 25rem">
                <div v-for="(data, dataIndex) in filteredRecords" :key="dataIndex" class="mb-2">
                  <BranchItemRadio class="branchRadio" v-model="form.business_branch_ref" :data="data" :value="data.reference" v-slot="{dataValue}">
                    <div class="text-base text-gray-700">
                      <p class="mb-0">{{dataValue.name}}</p>
                      <!-- <small class="text-black-51">{{dataValue.address}}</small> -->
                    </div>
                  </BranchItemRadio>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <EdenButton @click="send" :loading="btn.loading" class="btn btn-jungle-green btn-sm">Next</EdenButton>
        </div>
      </div>

      <div class="modal-content" v-else >
        <div class="modal-header">
          <h5 class="modal-title">Branch</h5>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div class="modal-body px-4" style="height: 16rem">
          <div class="card border-0">
            <div class="card-body d-flex flex-column" >
              <img class="mb-3" style="height: 4.4rem" src="~/assets/images/nothing.svg">
              <div class="text-center mb-5">
                <h6 class="mb-3 ">Nothing to see here</h6>
                <p class="text-black-50">No Branch available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import InviteDirector from '~/components/wallet/upgrade/InviteDirector'
import BranchItemRadio from '~/components/loans/BranchItemRadio'
import { mapGetters } from 'vuex'
import _orderby from "lodash.orderby"
import { required, email } from "vuelidate/lib/validators";

export default {
  components: { InviteDirector, BranchItemRadio },
  data () {
    return {
      form: {
        invitee_email: null,
        business_branch_ref: null,
        role: 'HR'
      },
      btn: {
        loading: false
      },
      step: 1,
      search: null,
      error: null
    }
  },

  validations: {
    form: {
      invitee_email: { required, email },
    }
  },
  methods: {

    async next(){
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.step = 2
      }
    },
    async send() {
      if(this.form.business_branch_ref === null){
        this.error = 'Please select a branch!!'
      }
      else{
        this.btn.loading = true;
        try {
          let res = await this.$store.dispatch('salary-advance/inviteMembers', {...this.form})
          let toast = new bootstrap.Toast(document.getElementById('liveToast'), {
          delay: 7000,
          animation: true,
          })
          this.$store.commit('auth/setStates', {toast: {show: true,
              data: {
                header: 'Invite sent!',
                body: `Your have successful sent an invite to ${this.form.invitee_email}.`
              }}})
          toast.show()
          // await this.$store.dispatch('branch/getBranches')

        }catch (e) {
          let toast = new bootstrap.Toast(document.getElementById('liveToast'), {
          delay: 7000,
          animation: true,
          })
          this.$store.commit('auth/setStates', {toast: {show: true,
              data: {
                header: 'Ooops!',
                body: `${e.message}`
              }}})
          toast.show()
          this.error = e.message
        }
        finally {
        this.btn.loading= false;
        this.step = 1
        this.close()
      }
      }
      
    },
    close() {
      let modal = bootstrap.Modal.getInstance(document.getElementById('invite-hr'))
      modal.hide()
    }
  },

  computed: {
    ...mapGetters({
      branchList: 'branch/branchList'
    }),

    filteredRecords() {
      if(this.branchList && this.branchList.length > 0) {
        let records = this.branchList;
        if(this.search){
          records = records.filter(record =>{
            return (
              record.name.toLowerCase().includes(this.search.toLowerCase())
            )
          })
        }

        return records
      }
    },

    emailErr() {
      if (!this.$v.form.invitee_email.required) return "Email address is required";
      if (!this.$v.form.invitee_email.alpha) return "Invalid email address";
    },
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
  },

  async beforeMount() {
    this.user = Object.assign({}, this.$store.state.auth.user)
    try {
      await this.$store.dispatch('branch/getBranches', this.user.reference)
    }catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>

.search {
  input {
    height: 50px;
    font-weight: 400;
    font-size: 14px;
    padding-left: 12px;
  }
  span {
    right: 9px;
    top: 15px;
  }
}

.branchRadio {
  ::v-deep .radio-checkmark {
    top: 3px
  }
}

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
