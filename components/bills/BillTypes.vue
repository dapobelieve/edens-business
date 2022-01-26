<template>
  <div>
    <div class="row gx-xl-6 " v-if="bills && bills.length > 0" >
      <div class="col-lg-4 mb-3 mb-xl-0" v-for="(data, dataIndex) in bills" :key="dataIndex">
        <div class="fund-option px-4 mb-4 d-flex py-3 align-items-center cursor-pointer" @click="showModal('Electricity')">
            <div class="rounded-circle flex-shrink-0 bg-mint-lighter d-inline-flex align-items-center me-4 justify-content-center">
                <img src="~/assets/electricity.svg">
            </div>
            <div class="min-64">
                <p class="mb-0 fw-bolder">{{data.name}}</p>
                <p class="mb-0 body-1 text-black-50 ">{{data.description}}</p>
            </div>
        </div>
      </div>
      <div class="col-lg-4 col-xl-4 mb-3 mb-xl-0">
       <div class="fund-option px-4 mb-4 d-flex py-3 align-items-center cursor-pointer"  @click="showModal('Internet')">
            <div class="rounded-circle flex-shrink-0 bg-mint-lighter d-inline-flex align-items-center me-4 justify-content-center">
                <img src="~/assets/internet.svg">
            </div>
            <div class="min-64">
                <p class="mb-0 fw-bolder">Internet</p>
                <p class="mb-0 body-1 text-black-50 ">Pay and subscribe to countless internet providers.</p>
            </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="fund-option px-4 mb-4 d-flex py-3 align-items-center cursor-pointer"  @click="showModal('Cable Tv')">
            <div class="rounded-circle flex-shrink-0 bg-mint-lighter d-inline-flex align-items-center me-4 justify-content-center">
                <img src="~/assets/cable.svg">
            </div>
            <div class="min-64">
                <p class="mb-0 fw-bolder">Cable TV</p>
                <p class="mb-0 body-1 text-black-50 ">Pay and subscribe to countless Cable TV networks.</p>
            </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="fund-option px-4 mb-4 d-flex py-3 align-items-center cursor-pointer"  @click="showModal('Airtime')">
            <div class="rounded-circle flex-shrink-0 bg-mint-lighter d-inline-flex align-items-center me-4 justify-content-center">
                <img src="~/assets/phone.svg">
            </div>
            <div class="min-64">
                <p class="mb-0 fw-bolder">Airtime</p>
                <p class="mb-0 body-1 text-black-50">Pay for airtime.</p>
            </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="fund-option px-4 mb-4 d-flex py-3 align-items-center cursor-pointer"  @click="showModal('Water')">
            <div class="rounded-circle flex-shrink-0 bg-mint-lighter d-inline-flex align-items-center me-4 justify-content-center">
                 <img src="~/assets/water.svg">
            </div>
            <div class="min-64">
                <p class="mb-0 fw-bolder">Water</p>
                <p class="mb-0 body-1 text-black-50">Pay for water.</p>
            </div>
        </div>
      </div> -->
    </div>

    <ServiceProvider id="provider-modal" :billType="providerDetails" />
  </div>
</template>

<script>
import ServiceProvider from './ServiceProvider.vue'
export default {
    props:{
      bills:{
        type: Array
      }
    },
    components:{
        ServiceProvider
    },
    data(){
        return{
            providerModal: null,
            providerDetails: null
        }
    },
    methods:{
        showModal(data){
        this.providerDetails = data;
        this.$nextTick(() => {
            this.providerModal.show()
         })
        }
    },

    async mounted() {
    let _providerModal  = document.getElementById('provider-modal');
    this.providerModal = new bootstrap.Modal(_providerModal);
  }
}
</script>

<style lang="scss" scoped>
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

.min-64{
    min-height: 64px;
}
</style>