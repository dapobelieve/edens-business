<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header px-4">
          <h5 class="modal-title">Transaction details</h5>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div v-if="record" class="modal-body">
          <div class="px-3" style="height: 25rem">
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">TYPE</small>
              <span class="body-1 text-jungle-green">{{record.type}}</span>
            </div>
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">CATEGORY</small>
              <span class="body-1 text-jungle-green">{{ record.category }}</span>
            </div>
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">AMOUNT</small>
              <span class="body-1 text-jungle-green">{{ record.amount | currency }}</span>
            </div>
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">DATE</small>
              <span class="body-1 text-jungle-green">{{ dated(record.created_at) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">REFERENCE</small>
              <span class="body-1 text-jungle-green">{{ record.reference.toUpperCase() }}</span>
            </div>
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">STATUS</small>
              <span class="body-1 ">
                <StatusLabel color="good-green" :text="record.status" text-color="good-green" />
              </span>
            </div>
            <div class="d-flex flex-column mb-5">
              <small class="text-black-50 mb-3">DESCRIPTION</small>
              <span class="text-jungle-green caption">{{record.description}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['record'],
  methods: {
    dated(val) {
      return this.$dateFns.format(new Date(val), 'dd, LLL yyyy, K:mm b')
    }
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
</style>
