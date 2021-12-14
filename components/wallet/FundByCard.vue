<template>
  <div class="modal-content">
    <div class="modal-header px-4">
      <h5 class="modal-title">Fund Wallet - Debit Card</h5>
      <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
        <span class="ed-x fs-5"></span>
      </a>
    </div>
    <keep-alive>
      <Amount v-if="!showCards" @back="$emit('back')" @success="form =  {...form, ...$event}; showCards = true" />
    </keep-alive>
    <template v-if="showCards">
      <template v-if="!newCard">
        <NoCard @new-card="newCard = true" @back="showCards = false" v-if="!cards" />
        <CardList @new-card="newCard = true" @back="showCards = false" v-else />
      </template>
      <template v-else>
        <NewCard @back="newCard = false" @card-created="form =  {...form, ...$event}; _fundWallet()" />
      </template>
    </template>
  </div>
</template>

<script>
import NoCard from '~/components/card/fund/no-card'
import Amount from '~/components/card/fund/Amount'
import CardList from '~/components/card/fund/CardList'
import NewCard from '~/components/card/fund/NewCard'
export default {
  components: { NewCard, CardList, Amount, NoCard },
  data () {
    return {
      newCard: false,
      cards: 0,
      showCards: false,
      form: {}
    }
  },
  methods: {
    async _fundWallet() {
      try {
        let res = await this.$store.dispatch("wallet/fundWallet", {...this.form})
        let toast = new bootstrap.Toast(document.getElementById('liveToast'), {
          delay: 7000,
          animation: true,
        })
        this.$store.commit('auth/setStates', {toast: {show: true,
            data: {
              header: 'Transaction Successful',
              body: 'Your transaction was successful'
            }}})
        toast.show()
        this.$emit("close")
      }catch (e) {
        console.log(e.response.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>


.bank-details {
  div:not(:last-child) {
    border-bottom: 1px solid rgba(0, 32, 38, 0.1);;
  }
}
</style>
