import Vue from "vue";
import VueTelInput from "vue-tel-input"

Vue.use(VueTelInput, {
  dynamicPlaceholder: true,
  enabledCountryCode: true,
  enabledFlags: false,
  disabledFetchingCountry: true,
  onlyCountries: ['LR'],
  validCharactersOnly: true,
  inputClasses: 'form-control',
  mode: 'international'
});
