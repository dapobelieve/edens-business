import Cookies from 'js-cookie'
export default function(context) {
  if(Cookies.get('x-access-token') && context.route.name !== 'account-director-registration') {
    context.redirect('/')
  }
}
