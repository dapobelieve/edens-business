<template>
  <label class="eden-text-input">
    <input id="password" :value="value" @input="$emit('input', $event.target.value)" :type="displayPass ? 'text' : 'password'" class="form-control" :placeholder="placeholder">
    <span class="text-eden-mint cursor-pointer" @click="displayPass = !displayPass" :class="!displayPass ? 'ed-eye' : 'ed-eye-off'" ></span>
  </label>
</template>
<script>
export default {
  props: ['value', 'placeholder'],
  data() {
    return {
      displayPass: false
    }
  }
}
</script>
