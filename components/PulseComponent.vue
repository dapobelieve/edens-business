<template>
  <div class="ms-auto d-inline-flex align-items-center justify-content-center rounded-circle" :class="pulse ? 'pulse' : ''">
    <span :class="color" class="ed-alert-circle fs-4" style="margin-bottom: .6px"></span>
  </div>
</template>

<script>
export default {
  props: {
    pulse: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'text-bad-red'
    }
  }
}
</script>

<style lang='scss' scoped>
.pulse{
  position: relative;
  &:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    height: 18px;
    width: 18px;

    box-shadow: 0 0 0 0 rgba(191, 73, 80, .9);
    transform: scale(1);
    animation: pulse 2s infinite;
  }
}
@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(239, 74, 84, 0.9);
  }

  30% {
    transform: scale(1.5);
    box-shadow: 0 0 0 10px rgba(208, 134, 139, 0);
  }

  70% {
    transform: scale(0.95);
    box-shadow: 0 0 0 10px rgba(176, 58, 65, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(176, 58, 65, 0);
  }
}
</style>
