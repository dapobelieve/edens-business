<template>
  <div class="modal-body px-0 mb-0">
    <div v-if="formData" class="px-2 mx-3" style="height: 24rem">
      <div class="mb-5 ">
        <div class="mb-5">
          <p class="text-black-50">Card Style</p>
          <CardSelector :type="formData.style" />
        </div>
        <div class="">
          <p class="text-black-50 mb-1">Delivery details</p>
          <div>{{ formData.name }}</div>
          <div>+33 {{ formData.phone }} <br>
            {{ formData.add_1 }} <br>
            Monrovia <br>
            Liberia</div>
        </div>
      </div>
    </div>
    <div class="modal-footer px-4 pb-0 justify-content-between">
      <button @click.prevent="$emit('back')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
        <span class="ed-arrow-left text-eden-mint "></span>Back</button>
      <eden-button :disabled="btn.loading" :loading="btn.loading" @click.prevent="btn.loading = true;$emit('success')" class="btn btn-sm btn-jungle-green px-5">Send Request</eden-button>
    </div>
  </div>

</template>
<script>
import CardSelector from '~/components/card/CardSelector'
import EdenButton from '~/components/EdenButton'
export default {
  props: ['formData'],
  components: { EdenButton, CardSelector },
  data() {
    return {
      btn: {
        loading: false
      }
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
