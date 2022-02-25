<template>
  <div v-if="user" class="py-xl-4 pt-1 vh-100 ps-xl-4 d-flex flex-column pe-xl-3">
    <div class="d-flex align-items-xl-center align-items-end mb-4 mb-xl-4">
      <div><img :src="img" class="avatar avatar-lg me-xl-4"></div>
      <div>
        <h5>Hello {{ user.first_name }},</h5>
        <p class="text-black-50 m-0 caption">
          {{computeGreeting}} {{ user.first_name }}
        </p>
      </div>
      <div style="height: 36px; width: 36px;background-color: rgba(146, 204, 191, 0.1);" class="d-xl-none d-inline-flex justify-content-center align-items-center rounded-circle">
        <span class="ed-settings fs-4 text-eden-mint"></span>
      </div>
<!--      :disabled="!currentLoan"-->
      <button v-if="$route.name.includes('loans')"  @click="shouldRequestLoan"  class="d-none ms-auto d-xl-block btn btn-jungle-green btn-sm ms-auto">Request Loan
      </button>
      <button @click="inviteHrModal.show()" v-if="$route.name.includes('salary-advance')"  class="d-none ms-auto d-xl-block btn btn-jungle-green btn-sm ms-auto">
        Invite HR Members
      </button>
      <button @click="inviteBranchModal.show()" v-if="$route.name.includes('branches')"  class="d-none ms-auto d-xl-block btn btn-jungle-green btn-sm ms-auto">
        Add New Branch
      </button>
      <button @click="inviteDirectorModal.show()" v-if="$route.name.includes('directors')"  class="d-none ms-auto d-xl-block btn btn-jungle-green btn-sm ms-auto">
        Invite Director
      </button>

    </div>
    <keep-alive>
      <NuxtChild class="flex-grow-1 px-2 px-xl-0" />
    </keep-alive>
<!--    <MobileNav />-->
    <InviteBranch id="invite-branch" />
    <InviteHr id="invite-hr" />
    <InviteDirector id="invite-director" />
    <LoanModal @loan-success="requestLoanModal.hide();" @cannot-request="requestLoanModal.hide();" id="loanModal" />
    <CannotRequestLoanModal  />

    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1100">
      <div id="liveToast" :class="[toast.class ? `${toast.class}` : '']" class="toast border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div  class="toast-body d-flex justify-content-between align-items-start">
          <div>
            <h6 class="mb-3" v-if="toast.data">{{ toast.data.header }}</h6>
            <p class="m-0 text-black-51 caption" v-if="toast.data">{{toast.data.body}}</p>
          </div>
          <div class="cursor-pointer d-inline-flex align-items-center justify-content-center rounded-circle" data-bs-dismiss="toast" aria-label="Close" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);">
            <span class="ed-x fs-4 fw-bold"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import SettingsModal from '~/components/settings/SettingsModal'
import InviteHr from '~/components/business/InviteHr'
import InviteBranch from '~/components/business/InviteBranch'
import InviteDirector from '~/components/business/InviteDirector'
export default {
  components: { InviteDirector, SettingsModal, InviteHr, InviteBranch },
  layout: "default",
  computed: {
    computeGreeting()  {
      if(this.$route.name.includes('loans')) {
        return 'Looks like a good day to request for a loan'
      }else {
        let d = new Date();
        let time = d.getHours();

        if (time < 12) {
          return 'Good morning'
        }
        if (time > 12) {
          if(time < 17)
            return 'Good afternoon'
          else return 'Good Evening'
        }
        if (time === 12) {
          return 'Go eat lunch'
        }
      }
    },
    ...mapGetters({
      user: "auth/getUser",
      toast: "auth/toast",
      verified: "auth/isVerified",
      currentLoan: "loan/hasCurrentLoan"
    }),
  },
  data() {
    return {
      cannotRequestModal:  null,
      inviteHrModal:  null,
      inviteDirectorModal:  null,
      requestLoanModal: null,
      inviteBranchModal:null,
      img: "https://res.cloudinary.com/rohing/image/upload/v1585572497/harley-davidson-1HZcJjdtc9g-unsplash_vwslej.jpg",
    }
  },
  methods: {
    shouldRequestLoan() {
      // if(this.verified) {
        this.requestLoanModal.show()
      // }else {
      //   this.cannotRequestModal.show()
      // }
    },
  },
  mounted() {
    const cannotReq = document.getElementById('cannotRequestModal')
    this.cannotRequestModal = new bootstrap.Modal(cannotReq)

    const requestLoan = document.getElementById('loanModal');
    const _inviteHrModal = document.getElementById('invite-hr');
    const _inviteDirector = document.getElementById('invite-director');
    const _inviteBranchModal = document.getElementById('invite-branch');
    this.requestLoanModal = new bootstrap.Modal(requestLoan);
    this.inviteHrModal = new bootstrap.Modal(_inviteHrModal);
    this.inviteDirectorModal = new bootstrap.Modal(_inviteDirector);
    this.inviteBranchModal = new bootstrap.Modal(_inviteBranchModal);

  }
}
</script>
