<template>
  <vLogin :login-url="loginUrl" />
</template>

<script>
import vLogin from '@/components/vLogin'
import { LOGIN } from '@/helpers/url'
export default {
  name: 'Login',
  components: { vLogin },
  data () {
    return {
      loginUrl: LOGIN
    }
  }
}
</script>

<style scoped>

</style>
