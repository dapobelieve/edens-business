<template>
  <div class="modal-body px-0 mb-0">
    <div class="px-2 mx-3" style="height: 34rem">
      <div class="mb-8">
        <h3 class="mb-3">Where would you like us to deliver your card to?</h3>
        <div class="row mb-4">
          <div class="col">
            <input type="text" v-model="$v.form.name.$model" placeholder="Fullname" id="" class="form-control" aria-describedby="passwordHelpInline">
            <small class="fs-8 text-bad-red" v-if="$v.form.name.$error">{{nameErrs}}</small>
          </div>
          <div class="col">
            <div class="position-relative">
              <input style="padding-left: 46px" type="text" v-model="$v.form.phone.$model" placeholder="Phone" id="" class="form-control" aria-describedby="passwordHelpInline">
              <small style="top: 18px; left: 13px; font-size: 0.875rem; font-weight: 500" class="position-absolute">+231</small>
            </div>
            <small class="fs-8 text-bad-red" v-if="$v.form.phone.$error">{{phoneErrs}}</small>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            <input type="text" v-model="$v.form.add_1.$model" placeholder="Address Line 1" id="" class="form-control" aria-describedby="passwordHelpInline">
            <small class="fs-8 text-bad-red" v-if="$v.form.add_1.$error">{{addErrs1}}</small>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            <input type="text" v-model="$v.form.add_2.$model" placeholder="Address Line 2" id="" class="form-control" aria-describedby="passwordHelpInline">
            <small class="fs-8 text-bad-red" v-if="$v.form.add_2.$error">{{addErrs2}}</small>
          </div>
        </div>
        <div class="row mb-4">
          <div>
            <SelectComponent :options="countries" v-model="country" placeholder="Country"  />
            <small class="fs-8 text-bad-red" v-if="$v.form.country.$error">{{countryErr}}</small>
          </div>
        </div>
        <div class="row mb-4">
          <div>
            <SelectComponent :options="states" v-model="state" placeholder="State/Province"  />
            <small class="fs-8 text-bad-red" v-if="$v.form.state.$error">{{stateErr}}</small>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer px-4 pb-0 justify-content-between">
      <button @click.prevent="$emit('back')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
        <span class="ed-arrow-left text-eden-mint "></span>Back</button>
      <button @click.prevent="next" class="btn btn-sm btn-jungle-green px-5">Confirm</button>
    </div>
  </div>
</template>
<script>
import { required, numeric } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      country: null,
      countries: [
        {name: "Liberia", value: 1 },
        {name: "Nigeria", value: 2 },
      ],
      states: [
        {name: "Bong", value: 1},
        {name: "Nimba", value: 2},
        {name: "Maryland", value: 3},
        {name: "Lofa", value: 4},
      ],
      state: null,
      form: {
        name: null,
        phone: null,
        add_1: null,
        add_2: null,
        country: null,
        state: null,
      }
    }
  },
  watch: {
    state(newV) {
      this.form.state = newV.value
    },
    country(newV) {
      this.form.country = newV.value
    }
  },
  validations: {
    form: {
      name: {required},
      phone: { required, numeric},
      add_1: { required },
      add_2: { required },
      country: { required, numeric },
      state: { required, numeric },
    }
  },
  computed: {
    nameErrs() {
      if (!this.$v.form.name.required) return "Enter your full name";
    },
    phoneErrs() {
      if (!this.$v.form.phone.required) return "Enter your phone number";
      if (!this.$v.form.phone.numeric) return "Only numbers allowed";
    },
    addErrs1() {
      if (!this.$v.form.add_1.required) return "Enter your address";
    },
    addErrs2() {
      if (!this.$v.form.add_2.required) return "Enter your address";
    },
    stateErr() {
      if (!this.$v.form.state.required) return "Select a state";
    },
    countryErr() {
      if (!this.$v.form.country.required) return "Select a country";
    },
  },
  methods: {
    next() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('success', {...this.form})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.credit-card-style {
  height: 109px;
  width: 194px;
  background-position: center;
  border-radius: 12px;
  &>div {
    left: 43%;
    top: 36%;
    div {
      height: 28px;
      width: 28px;
      background: var(--bs-eden-mint);
    }
  }
  &-dark {
    background-image: url("./assets/credit-dark-card.svg");
  }
  &-light {
    background-image: url("./assets/images/credit-card-light.svg");
  }
}
</style>
