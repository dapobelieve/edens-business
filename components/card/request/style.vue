<template>
  <div class="modal-body px-0 mb-0">
    <div class="px-2 mx-3" style="height: 24rem">
      <div class="mb-5 ">
        <h3 class="mb-3">Select Card style</h3>
        <div class="d-flex justify-content-between">
          <div @click="style = 'dark'" class="credit-card-style credit-card-style-dark position-relative border cursor-pointer">
            <div v-if="style === 'dark'" class="position-absolute">
              <div class="rounded-circle d-flex justify-content-center align-items-center">
                <span class="ed-check fw-bold text-white"></span>
              </div>
            </div>
          </div>
          <div class="credit-card-style credit-card-style-light position-relative border">
            <div v-if="style === 'light'" class="position-absolute">
              <div class="rounded-circle d-flex justify-content-center align-items-center">
                <span class="ed-check fw-bold text-white"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer px-4 pb-0 justify-content-between">
      <button @click.prevent="$emit('back')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
        <span class="ed-arrow-left text-eden-mint "></span>Back</button>
      <button :disabled="!style" @click.prevent="$emit('success', {style: style})" class="btn btn-sm btn-jungle-green px-5">Proceed</button>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      style: "dark"
    }
  }
}
</script>
<style lang="scss" scoped>
.credit-card-style {
  height: 109px;
  width: 194px;
  background-position: center;
  border-radius: 12px;
  &>div {
    left: 43%;
    top: 36%;
    div {
      height: 28px;
      width: 28px;
      background: var(--bs-eden-mint);
    }
  }
  &-dark {
    background-image: url("./assets/credit-dark-card.svg");
  }
  &-light {
    background-image: url("./assets/images/credit-card-light.svg");
  }
}
</style>
