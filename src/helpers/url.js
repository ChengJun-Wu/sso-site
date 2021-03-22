const LOGIN = 'login'
const CAPTCHA = 'captcha'

const BACKEND_APP = 'backend/app'
const BACKEND_ROUTE = 'backend/route'

function idUrl (url, id) {
  return url + '/' + id
}

export {
  LOGIN,
  CAPTCHA,
  BACKEND_APP,
  BACKEND_ROUTE,
  idUrl
}
