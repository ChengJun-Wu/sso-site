<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-nav">
            <Submenu name="user">
              <template slot="title">
                <Icon type="ios-stats" />
                {{ user.Name }}
              </template>
              <MenuItem name="logout" to="/login">退出登陆</MenuItem>
            </Submenu>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff', height: '100vh'}">
          <Menu :active-name="$route.path" theme="light" width="auto" :open-names="menuOpenNames">
            <Submenu v-for="menu in menus" :key="menu.name" :name="menu.name">
              <template slot="title">
                <Icon :type="menu.icon"></Icon>
                {{menu.name}}
              </template>
              <MenuItem v-for="item in menu.children" :key="item.path" :to="item.path" :name="item.path">{{ item.name }}</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '14px'}">
          <Content :style="{background: '#fff'}">
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import api from '@/api'
import { Layout, Header, Sider, Content, Menu, Submenu, MenuItem, Icon } from 'view-design'
import { LOGIN } from '@/helpers/url'
import menu from '@/helpers/menu'
export default {
  name: 'Backend',
  components: { Layout, Header, Sider, Content, Menu, Submenu, MenuItem, Icon },
  computed: {
    menus () {
      return menu
    },
    menuOpenNames () {
      const subMenu = []
      try {
        this.menus.forEach(menu => {
          menu.children.forEach(item => {
            if (item.path === this.$route.path) {
              subMenu.push(menu.name)
              throw new Error('hit')
            }
          })
        })
      } catch (e) {}
      return subMenu
    },
    user () {
      return this.$store.state.user
    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      api({}).get(LOGIN).then(resp => {
        this.$store.commit('user', resp.data.data)
      })
    }
  }
}
</script>

<style scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-nav{
  width: 200px;
  margin: 0 0px 0 auto;
}
</style>
