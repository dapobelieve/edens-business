<template>
  <label :class="[isChecked ? 'bg-blue-50' : '' ]" class="border block w-100 rounded-1 px-3 py-4 cursor-pointer" style="background-color: #92CCBF1A">
    <div class="radio-container">
      <input
        :disabled="disabled"
        :checked="isChecked"
        :value="value"
        type="radio"
        name="radio"
        @change="updateInput"
      >
      <span class="radio-checkmark"></span>
      <slot :dataValue="data"></slot>
    </div>
  </label>
</template>

<script>
let checkbox = 0
export default {
  model: {
    prop: 'checkboxValue',
    event: 'change'
  },
  props: {
    data: {},
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      default: 'Branch'
    },
    checkboxValue: {
      default: ''
    },
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      checkboxId: checkbox++
    }
  },
  computed: {
    isChecked () {
      return this.checkboxValue === this.value
    }
  },
  methods: {
    updateInput () {
      this.$emit('change', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-container {
  display: block;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
}

.radio-checkmark {
  position: absolute;
  top: 1px;
  right: 0;
  height: 20px;
  width: 20px;
  border: 2px solid var(--bs-eden-mint);
  border-radius: 50%;
  &:after {
    content: "";
    position: absolute;
    display: none;
    top: 6px;
    left: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }
}

.radio-container input:checked ~ .radio-checkmark {
  background-color: var(--bs-good-green);
  border: none;
}
.radio-container input:checked ~ .radio-checkmark:after {
  display: block;
}
</style>
