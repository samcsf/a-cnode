<template>
  <mt-header fixed title="A-CNode" style="background-color:lightseagreen"> 
    <span v-if="showBack" tag='span' slot="left" style="font-size:18px;cursor:pointer;" @click="$router.go(-1)">{{"<"}}</span>
    <router-link v-if="$route.name === 'home'" tag='span' slot="right" style="font-size:18px;cursor:pointer;" to="/post">+</router-link>
  </mt-header>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  computed: {
    showBack () {
      let current = this.$route.name
      return current === 'content' || current === 'post' || current === 'user'
    }
  }
}
</script>
