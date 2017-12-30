<template>
  <mt-tabbar fixed v-model="selected" v-if="showBar">
    <mt-tab-item v-for="(tab, idx) in tabs" :id="tab.id" :key="tab.id+idx">
      <img slot="icon" src="../assets/logo.png">{{tab.name}}<mt-badge v-if="needShowBadge(tab)" size="normal" type="error">{{getBadge(tab)}}</mt-badge>
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
import {mapState} from 'vuex'
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
    },
    getBadge ({id}) {
      switch (id) {
        case 'messages':
          return this.messageCount
        default:
          return 0
      }
    },
    needShowBadge ({badge: flag, id}) {
      if (!flag) {
        return false
      }
      return this.getBadge({id}) > 0
    }
  },
  computed: {
    ...mapState(['messageCount']),
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
    },
    showBar () {
      let current = this.$route.name
      return current !== 'content' && current !== 'post' && current !== 'user'
    }
  }
}
</script>