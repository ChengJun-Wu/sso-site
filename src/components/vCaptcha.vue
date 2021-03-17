<template>
  <Modal v-model="enable" :closable="false" :mask-closable="false" width="200" class-name="vertical-center-modal">
    <div class="p-3">
      <img :src="imageUrl" class="w-100" />
    </div>
    <div class="px-5">
      <Input v-model="form.captcha"/>
    </div>
    <div slot="footer">
      <Button type="primary" size="small" long :loading="loading" @click="verify">验证</Button>
    </div>
  </Modal>
</template>

<script>
import api from '@/api'
import bus from '@/helpers/bus'
import { Modal, Button, Input } from 'view-design'
import { CAPTCHA } from '@/helpers/url'
import { messageIfSuccess, ok } from '@/helpers/resp'
export default {
  name: 'vCaptcha',
  components: { Modal, Button, Input },
  data () {
    return {
      enable: false,
      imageUrl: '',
      loading: false,
      form: {
        captcha: ''
      }
    }
  },
  mounted () {
    bus.$on('captcha', this.trick)
  },
  methods: {
    trick () {
      this.captcha()
      this.enable = true
    },
    captcha () {
      api({}).get(CAPTCHA).then(resp => {
        this.imageUrl = 'data:image/png;base64,' + resp.data.data
      })
    },
    verify () {
      api(this.form).post(CAPTCHA).then(resp => {
        messageIfSuccess(resp)
        if (ok(resp)) {
          this.enable = false
        }
      })
    }
  }
}
</script>

<style lang="less">
.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal{
    top: 0;
  }
}
</style>
