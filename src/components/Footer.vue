<template>
  <mt-tabbar fixed v-model="selected">
    <mt-tab-item id="首页">
      <img slot="icon" src="../assets/logo.png">
      首页
    </mt-tab-item>
    <mt-tab-item id="消息">
      <img slot="icon" src="../assets/logo.png">
      消息
    </mt-tab-item>
    <mt-tab-item id="什么">
      <img slot="icon" src="../assets/logo.png">
      什么
    </mt-tab-item>
    <mt-tab-item id="我的">
      <img slot="icon" src="../assets/logo.png">
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  data: function () {
    return {
      selected: ''
    }
  },
  watch: {
    'this.$route.path': function (val, oldVal) {
      console.log('!')
      switch (val) {
        case '/':
          this.selected = '首页'
          break
        default:
          this.selected = '消息'
          break
      }
    }
  }
}
</script>