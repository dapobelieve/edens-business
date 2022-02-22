<template>
  <div class="px-xl-3">
    <div class="row bg-white border h-100">
      <div class="col-xl-8 px-0 wallet">
        <div class="p-xl-4 py-4" style="background-color: rgba(250, 251, 251, 1)">
          <div class="mb-1">
            <small class="caption-2">Wallet Balance</small>
          </div>
          <div class="d-xl-flex align-items-center">
            <div class="d-flex align-items-center mb-3 mb-xl-0">
              <h2>{{walletBalance | currency}}</h2>
            </div>
            <div class="ms-auto d-flex d-xl-block">
              <button data-bs-toggle="modal" data-bs-target="#fund-wallet" class="btn btn-sm btn-jungle-green me-xl-3 me-1 px-3">
                <span class="ed-plus text-eden-mint fw-bold fs-6"></span>Fund Wallet</button>
              <button data-bs-toggle="modal" @click="sendMoney" class="px-3 me-2 btn text-black btn-sm btn-outline-eden-mint">
                Send Money
              </button>
              <button data-bs-toggle="modal" data-bs-target="#request-money-modal" class="px-3 text-black btn btn-sm btn-outline-eden-mint">
                Request
              </button>
            </div>
          </div>
        </div>
<!--        tier  section -->
        <div v-if="!tierStatus" class="d-flex justify-content-between line mb-6 px-4 py-5" style="background: rgba(239, 74, 84, 0.03)">
          <UpgradeCard  />
        </div>
        <Pending v-else />
<!--        recent transactions-->
        <div class="d-none d-xl-block">
          <div class="d-flex mb-4 px-4">
            <p class="mb-0 caption-2 text-jungle-green">Recent transactions</p>
            <div class="ms-auto ">
              <nuxt-link to="wallet/transactions" class="body-1 cursor-pointer text-jungle-green d-inline-flex align-items-center">View all <span class="text-eden-mint fs-6 ed-chevron-right"></span></nuxt-link>
            </div>
          </div>
          <WalletTransactions />
        </div>
      </div>
      <div class="col-xl-4 pt-5">
        <div class="mb-4 px-xl-5 d-flex align-items-center justify-content-between">
          <div class="d-inline-flex">
            <p class="mb-0 caption-2">Card</p>
          </div>
          <button style="height: 28px" @click="newCardModal.show()" class="px-3 py-3 me-2 btn text-black btn-sm btn-outline-eden-mint">
            Add Card
          </button>
        </div>
        <div>
          <div class="d-flex px-xl-5 justify-content-around px-0">
            <CreditcardComponent :card="card" :freeze="freeze" :color="cardSkin.type" />
          </div>
          <div class="d-flex justify-content-center my-5">
            <div @click="cardSkin.type = 'dark'" :class="[cardSkin.type === 'dark' ? 'card-selector-active' : '']" class="cursor-pointer card-selector card-selector-dark rounded-circle me-2">
              <div class="rounded-circle border"></div>
            </div>
            <div @click="cardSkin.type = 'light'" :class="[cardSkin.type === 'light' ? 'card-selector-active' : '']" class="cursor-pointer card-selector card-selector-light rounded-circle">
              <div class="rounded-circle border"></div>
            </div>
          </div>
          <div class="px-4">
            <div class="mb-3">
              <div class="d-flex justify-content-between">
                <span class="fw-bold">Recent activities</span>
                <nuxt-link to="wallet/card-activities" class="body-1 cursor-pointer text-jungle-green d-inline-flex align-items-center">View all <span class="text-eden-mint fs-6 ed-chevron-right"></span></nuxt-link>
              </div>
            </div>
<!--            <WalletActivityComponenet :key="x" class="mb-5" v-for="x in 4" />-->
          </div>
        </div>
      </div>
    </div>
    <FundWalletModal id="fund-wallet" />
    <SendMoneyModal id="withdraw-wallet" />
    <RequestCardModal id="new-card" />
    <CardDetailsModal :card="card" id="cardDetailsModal" />

    <ChangePin id="changePin" />
    <Delete id="deleteCard" />
    <UpgradeModal id="upgrade-modal" />
    <RequestMoneyModal id="request-money-modal" />
  </div>
</template>

<script>
import CardDetailsModal from '~/components/card/CardDetailsModal'
import Delete from '~/components/card/Delete'
import ChangePin from '~/components/card/ChangePin'
import FundWalletModal from '~/components/wallet/FundWalletModal'
import CreditcardComponent from '~/components/card/CreditcardComponent'
import { mapGetters } from "vuex"
import WalletTransactions from '~/components/wallet/WalletTransactions'
import SendMoneyModal from '~/components/wallet/SendMoneyModal'
import RequestCardModal from '~/components/card/request/RequestCardModal'
import PulseComponent from '~/components/PulseComponent'
import UpgradeModal from '~/components/wallet/upgrade/UpgradeModal'
import RequestMoneyModal from '~/components/wallet/request-money/RequestMoneyModal'
import UpgradeCard from '~/components/business/UpgradeCard'
import Pending from '~/components/wallet/upgrade/Pending'
  export default {
  components: {
    Pending, UpgradeCard,
    RequestMoneyModal,
    UpgradeModal,
    PulseComponent,
    RequestCardModal,
    CardDetailsModal,
    Delete,
    ChangePin,
    SendMoneyModal,
    WalletTransactions,
    FundWalletModal,
    CreditcardComponent },
  data () {
    return {
      freeze: false,
      detailsModal: null,
      deleteModal: null,
      upgradeModal: null,
      requestMoneyModal: null,
      pinModal: null,
      fundWalletModal: null,
      sendMoneyModal: null,
      newCardModal: null,
      card: null,
      cardSkin:{
        type: 'dark'
      },
      tr: {
        id: 'CREDIT',
        amount: 'FUND',
        duration: '4 months',
        plan: '$850.00/m',
        date: '12 Jan, 2021, 2:34AM',
      }
    }
  },
  computed: {
    ...mapGetters({
      walletBalance: "wallet/walletBalance",
      getTier: "auth/getTierLevel",
      account: "wallet/getAccount"
    }),
    tierStatus () {
      return this.account?.tier_upgrade_request_status === 'ACTIVE'
    }
  },
  methods: {
    sendMoney() {
      this.sendMoneyModal.show()
      return
      if(this.getTier.name === "TIER_0") {
        this.upgradeModal.show()
      }else {
        this.sendMoneyModal.show()
      }
    }
  },
  async asyncData(ctx) {
   try {
     await ctx.store.dispatch("wallet/getWallet")
     await ctx.store.dispatch("wallet/getTransactions")
   }catch (e) {
     console.log(e)
   }
  },
  async mounted() {
    let fundWallet = document.getElementById('fund-wallet');
    let _sendMoneyModal = document.getElementById('withdraw-wallet');
    let _newCardModal = document.getElementById('new-card');
    let _detailsModal = document.getElementById('cardDetailsModal')
    let _deleteModal = document.getElementById('deleteCard')
    let _changePinModal = document.getElementById('changePin')
    let _upgradeModal = document.getElementById('upgrade-modal')
    let _requestMoney = document.getElementById('request-money-modal')
    this.detailsModal = new bootstrap.Modal(_detailsModal)
    this.deleteModal = new bootstrap.Modal(_deleteModal)
    this.pinModal = new bootstrap.Modal(_changePinModal)
    this.sendMoneyModal = new bootstrap.Modal(_sendMoneyModal)
    this.fundWalletModal = new bootstrap.Modal(fundWallet);
    this.newCardModal = new bootstrap.Modal(_newCardModal);
    this.upgradeModal = new bootstrap.Modal(_upgradeModal);
    this.requestMoneyModal = new bootstrap.Modal(_requestMoney);
    // const { card } = await this.$store.dispatch('wallet/getCard');
    this.card = {pin: 1234,exp: '12/22',cvv: '323', card_number: '5555 5555 5555 4444'}
    // this.card = card
  }
}
</script>

<style lang="scss" scoped>
.line {
  position: relative;
  &::after {
    content: "";
    height: 1px;
    width: 100%;
    position: absolute;
    background-color: rgba(0, 32, 38, 0.1);
    right: 0;
    bottom: -41px
  }
}
.card-selector {
  height: 44px !important;
  width: 44px !important;
  padding: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;

  &-active {
    border: 2px solid #92CCBF;;
  }
  &-dark {
    &>div {
      background-image: url("../../assets/images/credit-card-dark-small.svg");
    }
  }
  &-light {
    &>div {
      background-image: url("../../assets/images/credit-card-light-small.svg");
    }
  }
  &>div {
    height: 32px;
    width: 32px;
    background-position: 50% 50%;
  }
}
.wallet {
  position: relative;
  &::after {
    content: "";
    height: 100%;
    width: 1px;
    background-color: rgba(0, 32, 38, 0.1);
    position: absolute;
    right: 0;
    top: 0
  }
}
.table {
  tr {
    th:last-child, td:last-child {
      text-align: center !important;
    }
  }
}
</style>
