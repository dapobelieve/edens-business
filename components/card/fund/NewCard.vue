<template>
  <div class="modal-body px-0 mb-0">
    <div class="px-2" style="height: 24rem">
      <div class="px-3 mb-3">
        <div class="mb-4">
          <input v-model="$v.form.cardNo.$model" class="form-control" placeholder="Card No">
          <small class="fs-8 text-bad-red" v-if="$v.form.cardNo.$error">{{cardNoErrs}}</small>
        </div>
        <div class="d-flex justify-content-between">
          <div>
            <input @keyup="formatKey" v-model="$v.form.expiry.$model" class="form-control" placeholder="Expiry date (MM/YY)">
            <small class="fs-8 text-bad-red" v-if="$v.form.expiry.$error">{{expiryErr}}</small>
          </div>
          <div>
            <input v-model="$v.form.cvv.$model" class="form-control" placeholder="CVV">
            <small class="fs-8 text-bad-red" v-if="$v.form.cvv.$error">{{cvvErrs}}</small>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer px-4 pb-0 justify-content-between">
      <button @click.prevent="$emit('back')" type="button" class="btn btn-sm btn-outline-eden-mint text-eden-green">
        <span class="ed-arrow-left text-eden-mint "></span>Back</button>
      <eden-button :loading="btn.loading" :disabled="btn.loading" @click="next" type="button" class="btn btn-sm btn-jungle-green px-5">Pay</eden-button>
    </div>
  </div>

</template>
<script>
import { required, numeric, maxLength, minLength } from "vuelidate/lib/validators";
import EdenButton from '~/components/EdenButton'
export default {
  components: { EdenButton },
  data() {
    return {
      btn: {
        loading: false,
      },
      form: {
        cardNo: "7485849403384948",
        expiry:null,
        cvv: null
      }
    }
  },
  validations:{
    form: {
      cardNo: { required, numeric, maxLength: maxLength(16), minLength: minLength(16) },
      expiry: { required },
      cvv: { required,  maxLength: maxLength(3), minLength: minLength(3) },
    }
  },
  methods: {
    formatKey(e) {
      let inputChar = String.fromCharCode(e.keyCode);
      var code = e.keyCode;
      var allowedKeys = [8];
      if (allowedKeys.indexOf(code) !== -1) {
        return;
      }

      e.target.value = e.target.value.replace(
        /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
      ).replace(
        /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
      ).replace(
        /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
      ).replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
      ).replace(
        /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
      ).replace(
        /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
      ).replace(
        /\/\//g, '/' // Prevent entering more than 1 `/`
      );
    },
    async next() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.btn.loading = !this.btn.loading
        setTimeout(() => {
          this.btn.loading = !this.btn.loading;
          this.$emit("card-created", {...this.form})
        }, 3000)

      }
    }
  },
  computed: {
    cardNoErrs() {
      if (!this.$v.form.cardNo.required) return "Enter credit card number";
      if (!this.$v.form.cardNo.numeric) return "Invalid credit card number";
    },
    expiryErr() {
      if (!this.$v.form.expiry.required) return "Enter expiry date";
    },
    cvvErrs() {
      if (!this.$v.form.cvv.required) return "Enter you cvv";
      if (!this.$v.form.cvv.numeric) return "Invalid cvv number";
      if (!this.$v.form.cvv.minLength) return "Minimum of 3 digits";
      if (!this.$v.form.cvv.maxLength) return "Maximum of 3 digits";
    }
  }
}
</script>
<style lang="scss" scoped>
.fund-option {
  background: rgba(146, 204, 191, 0.1) url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%2392ccbf' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='3' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 8px;
  transition: all 300ms ease-in;
}
</style>
