import Vue from "vue"

export default () => {
  Vue.filter('currency', function(value) {
    if (value) return `${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(parseFloat(value / 100))}`
    return `$0.00`
  })
}
