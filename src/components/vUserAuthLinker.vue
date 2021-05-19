<template>
  <Modal v-model="modal" title="关联路由" class-name="vertical-center-modal" width="800">
    <Transfer
      :titles="['未关联', '已关联']"
      :data="auths"
      :target-keys="userAuths"
      filterable
      @on-change="onChange"
      class="d-flex justify-content-center"></Transfer>
    <div slot="footer">
    </div>
  </Modal>
</template>

<script>
import { Modal, Transfer } from 'view-design'
import api from '@/api'
import { BACKEND_USER_AUTH, BACKEND_AUTH, idUrl, url } from '@/helpers/url'
import { ok } from '@/helpers/resp'
import { arrayColumn, inArray } from '@/helpers/array'
export default {
  name: 'vUserAuthLinker',
  components: { Modal, Transfer },
  data () {
    return {
      modal: false,
      auths: [],
      userAuths: [],
      user: null
    }
  },
  methods: {
    enable (row) {
      this.user = row
      this.fetchAuths()
      this.fetchUserAuths()
      this.modal = true
    },
    fetchAuths () {
      api({ limit: 10000 }).get(BACKEND_AUTH).then(resp => {
        if (ok(resp)) {
          resp.data.data.forEach((item) => {
            item.key = item.ID
            item.label = item.Name + ' | ' + item.Desc
            return item
          })
          this.auths = resp.data.data
        }
      })
    },
    fetchUserAuths () {
      api({ limit: 10000 }).get(url(BACKEND_USER_AUTH, this.user.ID)).then(resp => {
        if (ok(resp)) {
          this.userAuths = arrayColumn(resp.data.data, 'AuthId')
        }
      })
    },
    onChange (newTargetKeys) {
      const needDelete = []
      const remain = []
      const needAdd = []
      this.userAuths.forEach(item => {
        if (!inArray(item, newTargetKeys)) {
          needDelete.push(item)
        } else {
          remain.push(item)
        }
      })
      newTargetKeys.forEach(item => {
        if (!inArray(item, remain)) {
          needAdd.push(item)
        }
      })
      this.modify(needDelete, needAdd)
      this.userAuths = newTargetKeys
    },
    modify (del, add) {
      del.forEach(item => {
        api({}).delete(idUrl(url(BACKEND_USER_AUTH, this.user.ID), item)).then(resp => {
        })
      })
      add.forEach(item => {
        api({}).put(idUrl(url(BACKEND_USER_AUTH, this.user.ID), item)).then(resp => {
        })
      })
    }
  }
}
</script>

<style type="less">
.ivu-transfer-list {
  width: 350px;
  height: 400px;
}
.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal{
    top: 0;
  }
}
</style>
