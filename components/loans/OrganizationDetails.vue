<template>
    <div class="modal-content border-0">
        <div class="modal-header px-4">
            <h5 class="modal-title">Organization details</h5>
            <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
            </a>
        </div>
       <div class="modal-body px-4" style="height: 26rem">
            <div>
                <div class="d-flex justify-content-between mb-3">
                <span class="body-1 fw-bolder">Organization name</span>
                </div>
            </div>
            <div>
              <SelectComponent :options="organizations" placeholder="Select Organization"  />
            </div>

        </div>

        <div class="modal-footer ms-0 px-4 mb-3">
            <button @click="next" type="button" class="btn btn-sm btn-jungle-green px-6">
              <span>Next</span>
            </button>
        </div>
    </div>
</template>

<script>
    export default{
        data () {
            return{
              form: {},
                organizations:[
                    { name: 'Edens360', value: 1 },
                    { name: 'Facebook', value: 2 },
                    { name: 'Google', value: 3 },
                ]
            }

        },
        methods: {
          next() {
            this.$emit("loan-proceed", {...this.form})
          }
        }
    }
</script>

<style lang="scss" scoped>


</style>
