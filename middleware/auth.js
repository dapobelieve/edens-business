import Cookies from 'js-cookie'
export default async function(context) {
  let token = Cookies.get('x-access-token')

  if(!token) {
    context.redirect('/account/login')
  }
  try {
    // await context.store.dispatch("auth/me");
    context.store.commit('auth/setToken', token)
    // await context.store.dispatch("loan/getCurrentLoan")
  }catch (e) {
    console.log(e)
  }

}
