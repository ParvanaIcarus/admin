<template>
  <div class>
    <h1>Welcome:{{admin}}</h1>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Welcome',
  data() {
    return {}
  },
  props: {},
  computed: {
    ...mapState(['userInfo']),
    admin() {
      if (!this.userInfo.username) return
      return this.userInfo.username
    },
  },
}
</script>
<style lang="less" scoped>
</style>