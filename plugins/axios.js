import Cookies from 'js-cookie'
export default function(context) {
  context.$axios.onRequest(config => {
    const noToken = ['/signup', 'login']

    //internal header
    if(config.url.includes('internals')) {
      config.headers['x-client-id'] = process.env.NUXT_ENV_INTERNAL_API_KEY
    }

    if(!noToken.some(u => config.url.includes(u))) {
      config.headers['Authorization'] = `Bearer ${Cookies.get('x-access-token')}`
    }

  })

  context.$axios.onError(error => {
    if(error.response ) {
      if(error.response.status === 401) {
        Cookies.remove('x-access-token');
        context.redirect('/account/login')
      }else if(error.response && error.response.status === 451) {
        if (process.client) {
          let toast = new bootstrap.Toast(document.getElementById('liveToast'), {
            delay: 200000,
            animation: true,
          })
          context.store.commit('auth/setStates', {
            toast: {
              show: true,
              class: "toast-bad-red",
              data: {
                header: 'Account Unverified!',
                body: error.response.data.message
              }
            }
          })
          setTimeout(() => {toast.show()}, 500)
        }
      }else {
        throw error.response.data
      }
    }
    else {
      throw error
    }
  })
}
