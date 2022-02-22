<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 381px">
      <div class="modal-content" >
        <div class="modal-header px-4">
          <h5 class="modal-title">{{action}} confirmation</h5>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div v-if="details" class="modal-body" style="height: 10rem">
            <div class="flex-grow-1 px-2">
                <small v-if="action" class="text-black-50">Are you sure you want to {{action}} <span class="text-jungle-green fw-bold"> {{details.first_name + ' ' + details.last_name}}’s </span> account? </small>
            </div>

        </div>
        <div class="modal-footer ms-0 px-4 justify-content-between mb-3">
            <!-- <button @click="$emit('close-loan')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">/ -->
            <button @click="$emit('cancel-button')" :disabled="loading"  type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
                <span class="ed-arrow-left text-eden-mint "></span>Cancel</button>
            <button @click="submit" :disabled="loading" type="button" class="btn btn-sm bg-bad-red px-5 text-white">
              <loader v-if="loading" class="ms-1" />
              <span v-else class="fs-7 me-sm-0">
                Yes, {{action}} 
                </span>
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '~/components/Loader'

export default {
  props:{
    details: Object,
    loading:{
      type: Boolean,
      default: false
    },
    action: String
  },
  methods:{
      submit(){
        const data = {
          action: this.action.toLowerCase(),
        }
        this.$emit('update-status', this.details, data)
      }
  },
  components: { Loader }
}
</script>

<style lang="scss" scoped>
.more-height{
    min-height: 10rem;
}

</style>