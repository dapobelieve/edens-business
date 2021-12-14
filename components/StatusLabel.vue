<template>
  <div class="d-inline-flex progress-label align-items-center rounded px-2" style="background-color: rgba(0, 32, 38, 0.02);">
    <div :class="`bg-${color}`" style="height: 8px; width: 8px;" class="rounded-circle me-2"></div>
    <span class="body-1 caption-2" :class="`text-${textColor}`">{{text}}</span>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: 'lavender-floral'
    },
    text: {
      type: String,
      default: 'Hello World'
    },
    textColor: {
      type: String,
      default: 'black-50'
    }
  }
}
</script>

<style scoped>

</style>
