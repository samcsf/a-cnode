<template>
  <div id="app">
    <mt-header fixed title="A-CNode" style="background-color:lightseagreen"> 
      <router-link tag='span' slot="right" style="font-size:18px;cursor:pointer;" to="/post">+</router-link>
    </mt-header>
    <router-view></router-view>
    <v-footer/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {Toast} from 'mint-ui'
import Footer from '@/components/Footer'

export default {
  name: 'app',
  data: function () {
    return {}
  },
  components: {
    'v-footer': Footer
  },
  methods: {
    ...mapActions(['fetchTopicsWithDetail', 'login'])
  },
  created () {
    this.fetchTopicsWithDetail()
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

body{
}
</style>
