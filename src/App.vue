<template>
  <div id="app">
    <v-header/>
    <router-view class="view-wrapper"></router-view>
    <v-footer/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {Toast} from 'mint-ui'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default {
  name: 'app',
  data: function () {
    return {}
  },
  components: {
    'v-footer': Footer,
    'v-header': Header
  },
  methods: {
    ...mapActions(['fetchTopicsWithDetail', 'login'])
  },
  created () {
    this.fetchTopicsWithDetail({page: 1, refresh: true})
    // check local storage, whether there's existing token
    let token = window.localStorage.getItem('acnode_token')
    if (token) {
      console.log('Try to login with local token: ' + token)
      this.login(token)
      .then(res => {
        Toast({message: '自动登录成功', duration: 1000})
      })
      .catch(e => {
        // Toast({message: '自动登录失败', duration: 2000})
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 40px;
  margin-bottom: 60px;
}

* {
  box-sizing: border-box;
}

body{
  background-color: #f8f8f8;
}

.view-wrapper {
  min-height: calc(100vh - 90px);
  background-color: #f8f8f8;
}
</style>
