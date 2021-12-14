import Vue from "vue"

export default (context) => {
  Vue.filter('dateFormatter', (value) => {
    if(value) {
      return `${context.$dateFns.format(new Date(value), "d LLL yyyy")}`
    }
    return 'N/A'
  })
}
