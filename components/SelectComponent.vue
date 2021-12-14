<template>
  <div>
    <v-select :disabled="disable" :value="value" @input="$emit('input', $event)" :label="labelName" :placeholder="placeholder"  :options="options"></v-select>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Select your company"
    },
    disable: {
      type: Boolean,
      default: false
    },
    value: {
    },
    labelName: {
      type: String,
      default: 'name'
    },
    options: {
      type: Array,
      default: () => [
        { name: 'Access Bank Liberia', value: 1 },
        { name: 'Eco Bank Liberia', value: 2 },
        { name: 'LBDI', value: 2 },
        { name: 'International Bank Liberia', value: 4 },
        { name: 'SIB', value: 5 },
        { name: 'Global Bank', value: 5 },
        { name: 'Afriland Bank Liberia', value: 5 },
        { name: 'UBA', value: 5 },
      ]
    },
  }
}
</script>

<style lang="scss" scoped>
.v-select {
  ::v-deep .vs__dropdown-toggle {
    height: 50px;
    border-radius: 4px;
    border: 2px solid rgba(0, 32, 38, 0.1) !important;
  }
  ::v-deep input {
    font-size: 0.875rem;
    font-weight: 500;
    margin-left: 1rem;
    color: #6c757d;
  }

  ::v-deep button {
    display: none;
  }

  ::v-deep .vs__actions {
    margin-right: 1rem;
  }
  ::v-deep .vs__selected {
    margin-left: 1rem;
    font-weight: 500;
  }
  ::v-deep ul {
    top: 58px;
    border: 0;
    border-radius: 4px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
    padding: 0;

    li {
      padding: 1.25rem 1.4375rem;
      font-size: 0.875rem;
      color: var(--bs-jungle-green);
      font-weight: 500;
      &:hover {
        background-color: var(--bs-jungle-green);
        color: #fff
      }
      &:before {
        content: ""

      }
    }
  }
}
</style>
