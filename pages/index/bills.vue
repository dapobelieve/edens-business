<template>
  <div>
    <template>
      <div class="card">
        <div class="card-body" style="padding: 2.25rem; padding-top: 2.125rem; padding-bottom: 8.25rem">
            <BillTypes :bills="bill" />
        </div>
      </div>
    </template>
<!--    <div data-bs-toggle="modal" data-bs-target="#cannotRequestModal" class="d-xl-none request-loan position-fixed bg-jungle-green rounded-circle d-inline-flex align-items-center justify-content-center shadow-lg">-->
<!--      <span class="ed-plus text-eden-mint fs-1"></span>-->
<!--    </div>-->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BillTypes from '~/components/bills/BillTypes.vue'
export default {
  components: {BillTypes},
  data () {
    return {
      user: null,
      toast: null,
    }
  },
  methods: {
    requestLoan() {
      let modal
      if(this.verified) {
        modal = bootstrap.Modal.getInstance(document.getElementById('loanModal'))

      }else {
        modal = bootstrap.Modal.getInstance(document.getElementById('cannotRequestModal'))
      }
      modal.show()
    },
  },
  computed: {
    ...mapGetters({
      verified: 'auth/isVerified',
      bill: 'bill/billList'
    })
  },
  async beforeMount() {
    this.user = Object.assign({}, this.$store.state.auth.user)
    try {
      await this.$store.dispatch('bill/getBills')
    }catch (e) {
      console.log(e)
    }
  }
}
</script>
<style lang="scss" scoped>
.progress-label {
  background-color: rgba(0, 32, 38, 0.02);
}
.request-loan {
  height: 3.125rem;
  width: 3.125rem;
  bottom: 5rem;
  right: 1rem
}
</style>
