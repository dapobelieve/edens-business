<template>
  <div class="form-group">
    <label class="form-label" for="phone_number">
    </label>
    <client-only>
      <vue-tel-input
        @input="compute($event)"
        input-id="phone_number"
        :required="true"
        :disabled="disable"
        input-classes="form-control"
        @country-changed="countryChanged"
      ></vue-tel-input>
    </client-only>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "Phone Number"
    },
    disable: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      number: null,
      country: null
    }
  },
  methods: {
    countryChanged(obj) {
      this.country = obj
    },
    compute(input) {
      this.$emit('input',input.replace(/ /gi, ''))
    },
  }
}
</script>
<style lang="scss" scoped>
.vue-tel-input {
  border: none !important;
  width: 100%;
  height: 50px;
  //font-size: 0.875rem;
  font-weight: 500;

  ::v-deep .vti__dropdown {
    background-color: rgb(245, 245, 245);
    margin-right: 0.9rem;
    border-radius: .25rem;

    &:focus-visible {
      outline: none;
      border: 1px solid #ff9311;
    }
  }

  ::v-deep .vti__dropdown-list {
    max-width: 20rem;
    border-radius: 4px;
    border: none;
    box-shadow: 0px 3px 6px #14151a14, 0px 7px 14px #474d5714, 0px 0px 1px #14151a1a; //binance shadow

    &.below {
      top: 46px;
    }
    .vti__dropdown-item {
      font-size: 14px;
      padding: 10px;
      display: flex;
      align-items: center;

      strong {
        flex-grow: 1;
      }
    }

    &::-webkit-scrollbar {
      width: 2px;
      height: 9px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--bs-jungle-green);
      -webkit-border-radius: 1rem;
      //-webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
    }
  }

  ::v-deep input {
    border: 2px solid #ced4da;
    border-radius: .25rem;
    height: 50px;
    font-size: 0.875rem;
    font-weight: 500;
    padding-left: 1rem;
    &:hover {
      border: 2px solid var(--bs-eden-mint);
    }

    &:focus {
      background-color: rgba(146, 204, 191, 0.1);;
    }
  }

  &:focus-within {
    box-shadow: none !important;
    border: none;
  }
}
</style>
