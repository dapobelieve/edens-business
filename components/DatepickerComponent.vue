<template>
  <div>
    <date-picker :value="value" @input="$emit('input', $event)" name="uniquename" placeholder="Date of Birth (DD-MM-YY)"></date-picker>
  </div>
</template>

<script>
export default {
  props:{
    value: null
  }
}
</script>

<style lang="scss" scoped>
.vdp-datepicker {
  ::v-deep >div {
    &:focus-visible {
      outline-color: var(--bs-eden-mint) !important;
    }
  }
  ::v-deep input {
    height: 50px;
    border-radius: 4px;
    width: 100%;
    padding-left: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--bs-jungle-green);
    border: 2px solid rgba(0, 32, 38, 0.1);
    &:focus {
      background-color: rgba(146, 204, 191, 0.1);
      border-color: red;
    }
  }

}
</style>
