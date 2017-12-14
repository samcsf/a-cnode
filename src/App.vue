<template>
  <div id="app">
    <!-- <router-view/> -->
    <mt-header fixed title="A-CNode" style="background-color:lightseagreen"> 
      <router-link to="/" slot="left" tag="mt-button">Home</router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <router-view></router-view>
    <vfooter/>
  </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'app',
  data: function () {
    return {}
  },
  components: {
    vfooter: Footer
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
