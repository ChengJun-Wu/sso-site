<template>
  <div class="d-flex justify-content-center align-items-center">
    <span class="text-white">{{ current }}</span>
  </div>
</template>

<script>
export default {
  name: 'vLogo',
  data () {
    return {
      list: [
        '⊙_⊙',
        '>_<',
        '^_^'
      ],
      current: '',
      interval: null
    }
  },
  created () {
    this.initInterval()
  },
  methods: {
    initInterval () {
      this.interval = setInterval(this.flex, 1000)
    },
    flex () {
      const idx = parseInt(Math.random() * this.list.length)
      this.current = this.list[idx]
    }
  }
}
</script>

<style scoped>
span{
  font-size: 16px;
}
</style>
