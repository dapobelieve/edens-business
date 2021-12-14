<template>
  <div class="d-inline-flex position-relative mb-2">
    <svg :width="width" :height="width" viewBox="0 0 100 100" class="" style="transform: rotate(1deg)">
      <circle
        cx="50" cy="50" :r="radius"
        stroke="currentColor"
        fill="none"
        :stroke-width="strokeWidth"
        :style="{color: '#eaeaea80'}"
      />
      <circle
        cx="50" cy="50" :r="radius"
        fill="none"
        stroke="currentColor"
        :stroke-dasharray="dash"
        :stroke-dashoffset="offset"
        :stroke-width="strokeWidth"
        :style="{color: fillColor}"
      />
    </svg>
    <h6 v-if="radius <= 50" :style="{color: fillColor}" class="position-absolute top-50 start-50 translate-middle" >{{percentage}}%</h6>
  </div>
</template>
<script>
export default {
  props: {
    strokeWidth: {
      type: Number,
      default: 3
    },
    width: {
      type:Number,
      default: 72
    },
    color: {
      type: String,
      default: 'lavender-floral'
    },
    radius: {
      type: Number,
      default: 48
    },
    percentage: {
      type: Number,
      default: 82
    }
  },
  computed:{
    fillColor() {
      return getComputedStyle(document.documentElement).getPropertyValue(`--bs-${this.color}`).trim()
    },
    colorShade() {
      return
    },
    dash() {
      return 2 * Math.PI * this.radius
    },
    offset() { return (2 * Math.PI * this.radius) * (1 - (this.percentage/100)) }
  }
}
</script>

<style scoped>

</style>
