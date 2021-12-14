<template>
  <div class="d-inline-flex align-items-center">
    <div :class="labelColor" class="label-box"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    labelColor: {
      type: String,
      default: 'bg-good-green'
    }
  },
}
</script>

<style scoped>
.label-box {
  height: 12px;
  width: 12px;
  border-radius: 4px;
  margin-right: 12px;
}
</style>
