<template>
  <div class="tab me-3 rounded-3">
    <div :class="[(index <= active) ? 'tab-active' : '', (half===active && active===index) ? 'w-50': 'w-100']" class="inner" ></div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number
    },
    active:{
      type: Number,
      default: 0
    },
    half: {
      type: Number,
      default: 0
    }
  },
}
</script>
