<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div v-if="currentPage === 'select-provider'" class="modal-dialog modal-dialog-centered" style="max-width: 477px">
      <div  v-if="billProviders && billProviders.length > 0"  class="modal-content" >
        <div class="modal-header px-4">
          <h5 class="modal-title">{{billType.name}}</h5>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div class="modal-body px-4" >
            <div>
              <div class="d-flex justify-content-between mb-3">
                <span class="body-1 caption-2">Select service a provider</span>
              </div>
            </div>

            <div>
                <form class="search position-relative">
                    <input name='search-records' type='search' autocomplete='randomstring' class="form-control" placeholder="Search" v-model="search">
                    <span class="ed-search cursor-pointer text-eden-mint position-absolute"></span>
                </form>
            </div>

            <div v-for="(data, dataIndex) in billProviders" :key="dataIndex" class="mt-4 fund-option px-4 mb-4 d-flex py-3 align-items-center cursor-pointer" @click="showSummary(data)">
                <div class="rounded-circle flex-shrink-0 bg-mint-lighter d-inline-flex align-items-center me-4 justify-content-center">
                    <img src="~/assets/electricity.svg">
                </div>
                <div>
                    <p class="mb-0 fw-bolder">{{data.name}}</p>
                </div>
            </div>

        </div>
        <div class="modal-footer ms-0 px-4 mb-3">
            <button type="button" class="btn btn-sm btn-jungle-green px-6">
              <span>Next</span>
            </button>
        </div>
      </div>
      <div class="modal-content" v-else >
        <div class="modal-header px-4" v-if="billType">
          <h5 class="modal-title">{{billType.name}}</h5>
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
                <p class="text-black-50">No provider available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <Summary v-else-if="currentPage === 'summary'" :bill="billType" :provider="providerDetails" @confirm-payment="form =  {...form, ...$event}; currentPage='confirm'" @back="back" />
    <ConfirmPayment v-else @back="back" @make-payment="makePayment" :info="{...form}" :loading="loading"  />
  </div>
</template>

<script>
import Summary from './Summary.vue'
import ConfirmPayment from './ConfirmPayment.vue'

export default {
  components:{Summary, ConfirmPayment},
  data() {
    return {
      search: null,
      providerDetails: null,
      currentPage:'select-provider',
      form:{},
      loading: false
    }
  },
  props:{
    billType: Object,
    billProviders: Array
  },
  methods:{
    showSummary(data) {
        this.currentPage = 'summary'
        this.providerDetails= data
    },
    confirm(){
        this.currentPage = 'confirm'
    },
    back(){
        if (this.currentPage === 'summary'){
            this.currentPage = 'select-provider'
        }else if(this.currentPage === 'confirm'){
            this.currentPage = 'summary'
        }
    },
    async makePayment(){
      this.loading = true
      let bill_id = this.billType ? this.billType.id : ''
      try {
          let res = await this.$axios.$post(`bills/pay/${bill_id}`, {
            ...this.form,
            // bill_id: this.billType.id,
            // bill_provider_id,
          })
          let toast = new bootstrap.Toast(document.getElementById('liveToast'), {
          delay: 7000,
          animation: true,
          })
          this.$store.commit('auth/setStates', {toast: {show: true,
              data: {
                header: 'Payment sucessful!',
                body: `Your bill payment was successfull`
              }}})
          toast.show()
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
        this.loading= false;
        this.close()
      }
    },
    close(){
      let modal = bootstrap.Modal.getInstance(document.getElementById('provider-modal'))
      modal.hide()
      this.currentPage='select-provider'
    },
  },
  mounted() {
    let modal = document.getElementById("provider-modal")
    modal.addEventListener('hidden.bs.modal', () => {
      this.currentPage = 'select-provider'
    })

    this.$once('hook:destroyed', () => {
      window.removeEventListener('hidden.bs.modal', ()=> {})
    })
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

.fund-option {
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%2392ccbf' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='3' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 8px;
  transition: all 300ms ease-in;
  div:first-child {
    height: 44px;
    width: 44px;
  }
}

.bg-mint-lighter{
    background-color: rgba(146, 204, 191, 0.2)!important;
}

</style>
