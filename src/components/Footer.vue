<template>
  <mt-tabbar fixed v-model="selected">
    <mt-tab-item v-for="(tab, idx) in tabs" :id="tab.id" :key="tab.id+idx">
      <img slot="icon" src="../assets/logo.png">{{tab.name}}<mt-badge v-if="tab.badge" size="normal" type="error">10</mt-badge>
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  data: function () {
    return {
      tabs: [
        {
          id: 'home',
          name: '首页',
          path: '/'
        },
        {
          id: 'messages',
          name: '消息',
          path: '/messages',
          badge: true
        },
        {
          id: 'what',
          name: '什么',
          path: '/what'
        },
        {
          id: 'mypage',
          name: '我的',
          path: '/mypage'
        }
      ]
    }
  },
  methods: {
    routeTo (path, ...args) {
      this.$router.push(path, ...args)
    }
  },
  computed: {
    selected: {
      get: function () {
        console.log('Now in ' + this.$route.path)
        let tabs = this.tabs
        let currentPath = this.$route.name
        let res = tabs.filter(t => currentPath === t.id)
        if (res.length <= 0) {
          return ''
        }
        return res[0].id
      },
      set: function (val) {
        let tabs = this.tabs
        let res = tabs.filter(t => t.id === val)
        return res.length ? this.routeTo('/' + res[0].id) : this.routeTo('/')
      }
    }
  }
}
</script>