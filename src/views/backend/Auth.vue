<template>
  <div class="p-3">
    <Row>
      <Col span="3" class="pl-2">
        <Input v-model="query.auth_key" placeholder="权限key" />
      </Col>
      <Col span="3" class="pl-2">
        <Input v-model="query.name" placeholder="名称" />
      </Col>
      <Col span="3" class="pl-2">
        <Input v-model="query.desc" placeholder="说明" />
      </Col>
      <Col span="3" class="d-flex justify-content-start">
        <Button type="primary" class="ml-2" @click="fetch">筛选</Button>
        <Button @click="reset" class="mx-2">清空</Button>
        <Button @click="add">新增</Button>
      </Col>
    </Row>
    <Divider></Divider>
    <Table border :columns="columns" :data="auths" :loading="loading">
      <template slot-scope="{ row }" slot="Enable">
        <Tag v-if="row.Enable === 1" color="success">使用中</Tag>
        <Tag v-if="row.Enable === 0" color="error">已废弃</Tag>
      </template>
      <template slot-scope="{ row }" slot="Action">
        <Button ghost size="small" type="primary" @click="modify(row)">修改</Button>
        <Button ghost size="small" type="success" class="ml-2" @click="linkRoute(row)">关联路由</Button>
      </template>
    </Table>
    <div class="d-flex justify-content-end mt-2">
      <Page :total="total" :current="query.page" :page-size="query.limit" @on-change="pageChange"/>
    </div>
    <Modal v-model="modal" title="修改 / 新增" width="400" class-name="vertical-center-modal">
      <Form>
        <FormItem label="权限key">
          <Input v-model="current.AuthKey" />
        </FormItem>
        <FormItem label="名称">
          <Input v-model="current.Name" />
        </FormItem>
        <FormItem label="说明">
          <Input v-model="current.Desc" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="small" long :loading="modal_loading" @click="save">保存</Button>
      </div>
    </Modal>
    <VAuthRouteLinker ref="linker" />
  </div>
</template>

<script>
import { Button, Col, Divider, Form, FormItem, Input, Modal, Page, Row, Table, Tag } from 'view-design'
import api from '@/api'
import { BACKEND_AUTH, idUrl } from '@/helpers/url'
import { messageIfSuccess, ok } from '@/helpers/resp'
import VAuthRouteLinker from '@/components/vAuthRouteLinker'
export default {
  name: 'auth',
  components: { VAuthRouteLinker, Divider, Row, Col, Button, Input, Table, Tag, Page, Modal, Form, FormItem },
  computed: {
    columns () {
      return [
        {
          title: 'ID',
          key: 'ID',
          align: 'center'
        },
        {
          title: '权限key',
          key: 'AuthKey',
          align: 'center'
        },
        {
          title: '名称',
          key: 'Name',
          align: 'center'
        },
        {
          title: '说明',
          key: 'Desc',
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
      api(this.query).get(BACKEND_AUTH).then(resp => {
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
      api({}).get(idUrl(BACKEND_AUTH, row.ID)).then(resp => {
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
      api(this.current).put(idUrl(BACKEND_AUTH, this.current.ID)).then(resp => {
        messageIfSuccess(resp)
        this.modal_loading = false
        this.modal = false
        this.fetch()
      })
    },
    store () {
      this.modal_loading = true
      api(this.current).post(BACKEND_AUTH).then(resp => {
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

<style type="less">
.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;

.ivu-modal{
  top: 0;
}
}
</style>
