<template>
  <button :disabled="disabled" @click="$emit('click', $event)">
    <loader v-if="loading" class="ms-1" />
    <slot v-else></slot>
  </button>
</template>

<script>
import Loader from '~/components/Loader'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: { Loader }
}
</script>

<style scoped>

</style>
