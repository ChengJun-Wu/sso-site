const LOGIN = 'login'
const CAPTCHA = 'captcha'

const BACKEND_APP = 'backend/app'
const BACKEND_ROUTE = 'backend/route'
const BACKEND_AUTH = 'backend/auth'
const BACKEND_AUTH_ROUTE = 'backend/auth/:id/route'
const BACKEND_USER = 'backend/user'
const BACKEND_USER_AUTH = 'backend/user/:id/auth'

function idUrl (url, id) {
  return url + '/' + id
}

function url (url, ...args) {
  args.forEach(arg => {
    url = url.replace(':id', arg)
  })
  return url
}

export {
  LOGIN,
  CAPTCHA,
  BACKEND_APP,
  BACKEND_ROUTE,
  BACKEND_AUTH,
  BACKEND_AUTH_ROUTE,
  BACKEND_USER,
  BACKEND_USER_AUTH,
  idUrl,
  url
}
