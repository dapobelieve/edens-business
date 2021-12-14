<template>
  <div>
    <div @click.prevent="detailsModal.show()" class="px-4 py-3 border cursor-pointer h-100 mb-3" style="border-radius: 8px">
      <div class="d-flex align-items-center">
        <div class="d-inline-flex align-items-center">
          <span class="ed-eye text-eden-mint me-3 fw-bold"></span>
          <span class="body-1 text-jungle-green">View card details</span>
        </div>
        <div class="ms-auto"><span class="ed-chevron-right fw-bold text-eden-mint"></span></div>
      </div>
    </div>
    <template>
      <div v-if="!freeze" @click.prevent="freeze = true" class="px-4 py-3 border cursor-pointer h-100 mb-3" style="border-radius: 8px">
        <div class="d-flex align-items-center">
          <div class="d-inline-flex align-items-center">
            <span class="ed-pause text-eden-mint me-3 fw-bold"></span>
            <span class="body-1 text-jungle-green">Freeze card</span>
          </div>
          <div class="ms-auto"><span class="ed-chevron-right fw-bold text-eden-mint"></span></div>
        </div>
      </div>
      <div v-else @click.prevent="freeze = false" class="px-4 py-3 border cursor-pointer h-100 mb-3" style="border-radius: 8px">
        <div class="d-flex align-items-center">
          <div class="d-inline-flex align-items-center">
            <span class="ed-play text-eden-mint me-3 fw-bold"></span>
            <span class="body-1 text-jungle-green">Unfreeze card</span>
          </div>
          <div class="ms-auto"><span class="ed-chevron-right fw-bold text-eden-mint"></span></div>
        </div>
      </div>
    </template>
    <div @click="pinModal.show()" class="px-4 py-3 border cursor-pointer h-100 mb-3" style="border-radius: 8px">
      <div class="d-flex align-items-center">
        <div class="d-inline-flex align-items-center">
          <span class="ed-edit-3 text-eden-mint me-3 fw-bold"></span>
          <span class="body-1 text-jungle-green">Change Pin</span>
        </div>
        <div class="ms-auto"><span class="ed-chevron-right fw-bold text-eden-mint"></span></div>
      </div>
    </div>
    <div @click.prevent="deleteModal.show()" class="px-4 py-3 border cursor-pointer h-100 mb-3" style="border-radius: 8px">
      <div class="d-flex align-items-center">
        <div class="d-inline-flex align-items-center">
          <span class="ed-trash text-bad-red me-3 fw-bold"></span>
          <span class="body-1 text-bad-red">Delete card</span>
        </div>
        <div class="ms-auto"><span class="ed-chevron-right fw-bold text-eden-mint"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
