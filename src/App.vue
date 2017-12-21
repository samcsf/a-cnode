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
    ...mapActions(['fetchTopicsWithDetail'])
  },
  created () {
    this.fetchTopicsWithDetail()
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
