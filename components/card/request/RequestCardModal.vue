<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header px-4">
          <template>
            <h5 v-if="step<3" class="modal-title">Request Card</h5>
            <h5 v-else class="modal-title">Request Card Confirmation</h5>
          </template>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <keep-alive>
          <Style  @back="close" v-if="step===1" @success="form = {...form, ...$event}; step=2" />
        </keep-alive>
        <keep-alive>
          <Address @back="step=1" @success="form = {...form, ...$event}; step=3" v-if="step===2" />
        </keep-alive>
        <keep-alive>
          <Summary :form-data="form" @success="createCard" v-if="step === 3" @back="step = 2" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import FundByBank from '~/components/wallet/FundByBank'
import Style from '~/components/card/request/style'
import Address from '~/components/card/request/address'
import Summary from '~/components/card/request/Summary'
export default {
  components: { Summary, Address, Style, FundByBank },
  data () {
    return {
      form: {},
      step:  1
    }
  },
  methods: {
    close() {
      let modal = bootstrap.Modal.getInstance(document.getElementById('new-card'))
      modal.hide()
    },
    async createCard() {
      setTimeout(() => {
        this.close()
        let toast = new bootstrap.Toast(document.getElementById('liveToast'), {
          delay: 7000,
          animation: true,
        })
        this.$store.commit('auth/setStates', {toast: {show: true,
            data: {
              header: 'Card request sent!',
              body: 'Your card request has been sent. You will be notified once it has been sent out for delivery.'
            }}})
        toast.show()
      }, 3000)
    }
  },
  async mounted() {
    let modal = document.getElementById("new-card")
    modal.addEventListener('hidden.bs.modal', () => {
      this.step = 1
    })

    this.$once('hook:destroyed', () => {
      window.removeEventListener('hidden.bs.modal', ()=> {})
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
