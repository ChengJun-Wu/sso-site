import axios from 'axios'
import qs from 'qs'
import { messageIfFail, redirectIfNeedLogin, verifyIfNeedCaptcha } from '@/helpers/resp'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api/' : '/adm/'
axios.defaults.withCredentials = true

export default function (params) {
  return {
    get (url) {
      const instance = axios.get(url, {
        params: params
      })
      instance.then(handleCommonAction).catch(handleError)
      return instance
    },
    post (url) {
      const instance = axios.post(url, qs.stringify(params))
      instance.then(handleCommonAction).catch(handleError)
      return instance
    },
    put (url) {
      const instance = axios.put(url, qs.stringify(params))
      instance.then(handleCommonAction).catch(handleError)
      return instance
    },
    delete (url) {
      const instance = axios.delete(url, {
        params: params
      })
      instance.then(handleCommonAction).catch(handleError)
      return instance
    }
  }
}

function handleCommonAction (resp) {
  redirectIfNeedLogin(resp)
  messageIfFail(resp)
  verifyIfNeedCaptcha(resp)
}

function handleError (e) {
}
