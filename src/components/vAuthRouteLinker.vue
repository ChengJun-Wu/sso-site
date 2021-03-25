<template>
  <Modal v-model="modal" title="关联路由" class-name="vertical-center-modal" width="800">
    <Transfer
      :titles="['未关联', '已关联']"
      :data="routes"
      :target-keys="authRoutes"
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
import { BACKEND_AUTH_ROUTE, BACKEND_ROUTE, idUrl, url } from '@/helpers/url'
import { ok } from '@/helpers/resp'
import { arrayColumn, inArray } from '@/helpers/array'
export default {
  name: 'vAuthRouteLinker',
  components: { Modal, Transfer },
  data () {
    return {
      modal: false,
      routes: [],
      authRoutes: [],
      auth: null
    }
  },
  methods: {
    enable (row) {
      this.auth = row
      this.fetchRoutes()
      this.fetchAuthRoutes()
      this.modal = true
    },
    fetchRoutes () {
      api({ limit: 10000 }).get(BACKEND_ROUTE).then(resp => {
        if (ok(resp)) {
          resp.data.data.forEach((item) => {
            item.key = item.ID
            item.label = item.Path + ' | ' + item.Method + ' | ' + item.Desc
            return item
          })
          this.routes = resp.data.data
        }
      })
    },
    fetchAuthRoutes () {
      api({ limit: 10000 }).get(url(BACKEND_AUTH_ROUTE, this.auth.ID)).then(resp => {
        if (ok(resp)) {
          this.authRoutes = arrayColumn(resp.data.data, 'RouteId')
        }
      })
    },
    onChange (newTargetKeys) {
      const needDelete = []
      const remain = []
      const needAdd = []
      this.authRoutes.forEach(item => {
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
      this.authRoutes = newTargetKeys
    },
    modify (del, add) {
      del.forEach(item => {
        api({}).delete(idUrl(url(BACKEND_AUTH_ROUTE, this.auth.ID), item)).then(resp => {
        })
      })
      add.forEach(item => {
        api({}).put(idUrl(url(BACKEND_AUTH_ROUTE, this.auth.ID), item)).then(resp => {
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
