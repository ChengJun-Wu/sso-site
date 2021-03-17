<template>
  <div id="app">
    <router-view/>
    <vCaptcha />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<script>
import VCaptcha from '@/components/vCaptcha'
export default {
  components: { VCaptcha }
}
</script>
