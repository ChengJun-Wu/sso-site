<template>
  <div class="bg d-flex justify-content-center align-items-center">
    <div class="container p-3">
      <div class="mb-2 p-1 d-flex justify-content-center align-items-center">
        <Input v-model="form.username" icon="ios-contact" placeholder="输入账号" @pressEnter="login">
          <Icon slot="suffix" type="user" />
        </Input>
      </div>
      <div class="mb-2 p-1 d-flex justify-content-center align-items-center">
        <Input v-model="form.password" type="password" password placeholder="输入密码" @pressEnter="login" />
      </div>
      <div class="mb-2 p-1 d-flex justify-content-center align-items-center">
        <Button type="primary" long @click="login" :loading="loading">登陆</Button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { ok } from '@/helpers/resp'
import { Input, Button } from 'view-design'
export default {
  name: 'vLogin',
  props: {
    loginUrl: String,
  },
  components: { Input, Button },
  data () {
    return {
      form: {
        username: '',
        password: '',
      },
      captchaImage: '',
      loading: false
    }
  },
  mounted () {
    this.logout()
  },
  methods: {
    login () {
      this.loading = true
      api(this.form).post(this.loginUrl).then(resp => {
        if (ok(resp)) {
          this.$router.push('backend')
        }
      }).finally(() => {
        this.loading = false
      })
    },
    logout () {
      api({}).delete(this.loginUrl)
    }
  }
}
</script>

<style scoped lang="less">
.bg{
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg") no-repeat;
  background-size: cover;
}
.container{
  width: 300px;
  background: #eee;
  border-radius: 5px;
  opacity: 0.8;
}
</style>
