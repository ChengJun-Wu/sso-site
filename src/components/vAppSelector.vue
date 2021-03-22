<template>
  <Select v-model="appId" placeholder="选择项目" @on-change="onChange">
    <Option v-for="app in apps" :key="app.ID" :value="app.ID">{{ app.Name }}</Option>
  </Select>
</template>

<script>
import { Select, Option } from 'view-design'
import { BACKEND_APP } from '@/helpers/url'
import api from '@/api'
export default {
  name: 'vAppSelector',
  components: { Select, Option },
  data () {
    return {
      apps: [],
      appId: null
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      api({ limit: 1000 }).get(BACKEND_APP).then(resp => {
        this.apps = resp.data.data
      })
    },
    onChange (val) {
      this.$emit('on-change', val)
    }
  }
}
</script>

<style scoped>

</style>
