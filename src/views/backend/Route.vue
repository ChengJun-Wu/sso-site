<template>
  <div class="p-3">
    <Row>
      <Col span="3">
        <vAppSelector @on-change="selectAppId"/>
      </Col>
      <Col span="3" class="pl-2">
        <Input v-model="query.path" placeholder="输入路由" />
      </Col>
      <Col span="3" class="d-flex justify-content-start">
        <Button type="primary" class="mx-2" @click="fetch">筛选</Button>
        <Button @click="reset">清空</Button>
      </Col>
    </Row>
    <Divider></Divider>
    <Table border :columns="columns" :data="routes" :loading="loading">
      <template slot-scope="{ row }" slot="Enable">
        <Tag v-if="row.Enable === 1" color="success">使用中</Tag>
        <Tag v-if="row.Enable === 0" color="error">已废弃</Tag>
      </template>
      <template slot-scope="{ row }" slot="Action">
        <Button ghost size="small" type="primary" @click="modify(row)">修改</Button>
      </template>
    </Table>
    <div class="d-flex justify-content-end mt-2">
      <Page :total="total" :current="query.page" :page-size="query.limit" @on-change="pageChange"/>
    </div>
    <Modal v-model="modal" title="修改" width="400" class-name="vertical-center-modal">
      <Form>
        <FormItem label="说明">
          <Input v-model="current.Desc" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="small" long :loading="modal_loading" @click="update">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Divider, Row, Col, Button, Input, Table, Tag, Page, Modal, Form, FormItem } from 'view-design'
import vAppSelector from '@/components/vAppSelector'
import { BACKEND_ROUTE, idUrl } from '@/helpers/url'
import api from '@/api'
import { messageIfSuccess, ok } from '@/helpers/resp'
export default {
  name: 'Route',
  components: { vAppSelector, Divider, Row, Col, Button, Input, Table, Tag, Page, Modal, Form, FormItem },
  computed: {
    columns () {
      return [
        {
          title: 'ID',
          key: 'ID',
          align: 'center'
        },
        {
          title: '路由',
          key: 'Path',
          align: 'center'
        },
        {
          title: '说明',
          key: 'Desc',
          align: 'center'
        },
        {
          title: '方法',
          key: 'Method',
          align: 'center'
        },
        {
          title: '使用中',
          slot: 'Enable',
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
        app_id: null,
        path: null,
        page: 1,
        limit: 10
      },
      loading: false,
      routes: [],
      total: 0,
      modal: false,
      modal_loading: false,
      current: {}
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      this.loading = true
      api(this.query).get(BACKEND_ROUTE).then(resp => {
        if (ok(resp)) {
          this.routes = resp.data.data
          this.total = resp.data.total
        }
        this.loading = false
      })
    },
    selectAppId (id) {
      this.query.app_id = id
    },
    modify (row) {
      api({}).get(idUrl(BACKEND_ROUTE, row.ID)).then(resp => {
        if (ok(resp)) {
          this.current = resp.data.data
          this.modal = true
        }
      })
    },
    update () {
      this.modal_loading = true
      api(this.current).put(idUrl(BACKEND_ROUTE, this.current.ID)).then(resp => {
        messageIfSuccess(resp)
        this.modal_loading = false
        this.modal = false
        this.fetch()
      })
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
