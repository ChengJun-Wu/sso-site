<template>
  <div class="p-3">
    <Row>
      <Col span="3" class="pl-2">
        <Input v-model="query.name" placeholder="名字" />
      </Col>
      <Col span="3" class="pl-2">
        <Input v-model="query.username" placeholder="用户名" />
      </Col>
      <Col span="3" class="d-flex justify-content-start">
        <Button type="primary" class="ml-2" @click="fetch">筛选</Button>
        <Button @click="reset" class="mx-2">清空</Button>
        <Button @click="add">新增</Button>
      </Col>
    </Row>
    <Divider></Divider>
    <Table border :columns="columns" :data="auths" :loading="loading">
      <template slot-scope="{ row }" slot="Action">
        <Button ghost size="small" type="primary" @click="modify(row)">修改</Button>
        <Button ghost size="small" type="success" class="ml-2" @click="linkRoute(row)">授权</Button>
      </template>
    </Table>
    <div class="d-flex justify-content-end mt-2">
      <Page :total="total" :current="query.page" :page-size="query.limit" @on-change="pageChange"/>
    </div>
    <Modal v-model="modal" title="修改 / 新增" width="400" class-name="vertical-center-modal">
      <Form>
        <FormItem label="名字">
          <Input v-model="current.Name" />
        </FormItem>
        <FormItem label="用户名">
          <Input v-model="current.Username" />
        </FormItem>
        <FormItem label="密码">
          <Input v-model="current.Password" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="small" long :loading="modal_loading" @click="save">保存</Button>
      </div>
    </Modal>
    <VUserAuthLinker ref="linker" />
  </div>
</template>

<script>
import VUserAuthLinker from '@/components/vUserAuthLinker'
import { Button, Col, Divider, Form, FormItem, Input, Modal, Page, Row, Table } from 'view-design'
import api from '@/api'
import { BACKEND_USER, idUrl } from '@/helpers/url'
import { messageIfSuccess, ok } from '@/helpers/resp'

export default {
  name: 'User',
  components: { VUserAuthLinker, Divider, Row, Col, Button, Input, Table, Page, Modal, Form, FormItem },
  computed: {
    columns () {
      return [
        {
          title: 'ID',
          key: 'ID',
          align: 'center'
        },
        {
          title: '名字',
          key: 'Name',
          align: 'center'
        },
        {
          title: '用户名',
          key: 'Username',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'Action',
          align: 'center'
        }
      ]
    }
  },
  data () {
    return {
      query: {
        auth_key: null,
        name: null,
        desc: null,
        page: 1,
        limit: 10
      },
      loading: false,
      auths: [],
      total: 0,
      modal: false,
      modal_loading: false,
      current: {},
      visible: false
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      this.loading = true
      api(this.query).get(BACKEND_USER).then(resp => {
        if (ok(resp)) {
          this.auths = resp.data.data
          this.total = resp.data.total
        }
        this.loading = false
      })
    },
    selectAppId (id) {
      this.query.app_id = id
    },
    modify (row) {
      api({}).get(idUrl(BACKEND_USER, row.ID)).then(resp => {
        if (ok(resp)) {
          this.current = resp.data.data
          this.modal = true
        }
      })
    },
    add () {
      this.current = {}
      this.modal = true
    },
    save () {
      if (this.current.ID) {
        this.update()
      } else {
        this.store()
      }
    },
    update () {
      this.modal_loading = true
      api(this.current).put(idUrl(BACKEND_USER, this.current.ID)).then(resp => {
        messageIfSuccess(resp)
        this.modal_loading = false
        this.modal = false
        this.fetch()
      })
    },
    store () {
      this.modal_loading = true
      api(this.current).post(BACKEND_USER).then(resp => {
        messageIfSuccess(resp)
        this.modal_loading = false
        this.modal = false
        this.fetch()
      })
    },
    linkRoute (row) {
      this.$refs.linker.enable(row)
    },
    reset () {
      this.query = {}
      this.fetch()
    },
    pageChange (page) {
      this.query.page = page
      this.fetch()
    }
  }
}
</script>

<style scoped>

</style>
