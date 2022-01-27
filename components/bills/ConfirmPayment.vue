<template>
    <div class="modal-dialog modal-dialog-centered" style="max-width: 381px">
        <div class="modal-content" >
            <div class="modal-header px-4">
                <h5 class="modal-title">Confirm Payment</h5>
                <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
                <span class="ed-x fs-5"></span>
                </a>
            </div>
            <div class="modal-body" style="height: 10rem">
                <div class="flex-grow-1 px-2">
                    <small class="text-black-50">Please confirm you want to pay <span class="text-jungle-green fw-bold">+234{{info.amount}}</span> to  <span class="text-jungle-green fw-bold">{{info.phone_number}}</span></small>
                </div>

            </div>
            <div class="modal-footer ms-0 px-4 justify-content-between mb-3">
                <button @click="$emit('back')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
                    <span class="ed-arrow-left text-eden-mint "></span>Change</button>
                <eden-button @click="$emit('make-payment')" :loading="loading" :disabled="loading" type="button" class="btn btn-sm btn-jungle-green px-5">
                    Pay now
                </eden-button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  props:['info', 'loading'],
  methods:{
    // approve() {
    //   if(this.salary){
    //     this.error = false
    //     this.currentPage = 'upload'
    //   }else{
    //     this.error = true
    //   } 
    // },
    // close(){
    //   let modal = bootstrap.Modal.getInstance(document.getElementById('employee-approval-modal'))
    //   modal.hide()
    //   this.currentPage='salary'
    // },
  },
}
</script>

<style lang="scss" scoped>


</style>