import iView from 'view-design'
import router from '@/router'
import moment from 'moment'
import bus from '@/helpers/bus'

const CODE_OK = 0
const CODE_FAIL = 1
const CODE_NEED_LOGIN = 2
// const CODE_NEED_AUTH = 3
const CODE_NEED_CAPTCHA = 4

function ok (resp) {
  return resp.data.code === CODE_OK
}

function fail (resp) {
  return resp.data.code === CODE_FAIL
}

function needLogin (resp) {
  return resp.data.code === CODE_NEED_LOGIN
}

function needCaptcha (resp) {
  return resp.data.code === CODE_NEED_CAPTCHA
}

function messageIfSuccess (resp) {
  if (ok(resp)) {
    iView.Message.success({
      background: true,
      content: resp.data.message
    })
  }
}

function messageIfFail (resp) {
  if (fail(resp)) {
    iView.Message.warning({
      background: true,
      content: resp.data.message
    })
  }
}

function redirectIfNeedLogin (resp) {
  if (needLogin(resp)) {
    router.replace({
      path: '/login' + '#' + moment.now()
    })
  }
}

function verifyIfNeedCaptcha (resp) {
  if (needCaptcha(resp)) {
    bus.$emit('captcha')
  }
}

export {
  ok,
  fail,
  messageIfSuccess,
  messageIfFail,
  needLogin,
  needCaptcha,
  redirectIfNeedLogin,
  verifyIfNeedCaptcha
}
