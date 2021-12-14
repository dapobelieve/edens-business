export default {
  ssr: false,
  head: {
    title: 'Welcome to Edens360',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://eden-bootstrap.netlify.app/css/jardin.css'},
    ],
    script: [
      { src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js", async: true, defer: true },
    ]
  },
  css: [
    '~/assets/css/main'
  ],
  plugins: [
    {
      src: '~/plugins/vue-select.js',
      mode: 'client'
    },
    {
      src: '~/plugins/dates',
      mode: 'client'
    },
    {
      src: '~/plugins/currency.js',
      mode: 'client'
    },
    {
      src: '~/plugins/vue-tel-input.js',
      mode: 'client'
    },
    {
      src: '~/plugins/datepicker.js',
      mode: 'client'
    },
    {
      src: '~/plugins/vuelidate.js',
      mode: 'client'
    },
    {
      src: "~/plugins/axios.js"
    }
  ],
  components: [
    '~/components/',
    '~/components/modals'
  ],
  buildModules: [
    ['@nuxtjs/date-fns']
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
  ],
  axios: {
    baseURL: process.env.NUXT_ENV_BASE_API
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.NUXT_ENV_BASE_API
    },
  },
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  content: {},
  build: {}
}
