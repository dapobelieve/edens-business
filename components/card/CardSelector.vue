<template>
  <div :class="[type === 'dark' ? 'card-selector-dark' : 'card-selector-light', active ? 'card-selector-active' : '']" class="cursor-pointer card-selector  rounded-circle me-2">
    <div class="rounded-circle border"></div>
  </div>
</template>

<script>
export default {
  props: ['type', 'active']
}
</script>

<style lang="scss" scoped>
.card-selector {
  height: 44px !important;
  width: 44px !important;
  padding: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;

&-active {
   border: 2px solid #92CCBF;;
 }
&-dark {
&>div {
   background-image: url("../../assets/images/credit-card-dark-small.svg");
 }
}
&-light {
&>div {
   background-image: url("../../assets/images/credit-card-light-small.svg");
 }
}
&>div {
   height: 32px;
   width: 32px;
   background-position: 50% 50%;
 }
}
</style>
