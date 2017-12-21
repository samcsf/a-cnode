<template>
  <div>
    <h1>My Page</h1>
    <img :src="user.avatar_url">
    <div>Name:{{user.loginname}}</div>
    <div>Id:{{user.id}}</div>
    <button @click="logout">Log out</button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {Toast} from 'mint-ui'

export default {
  data: function () {
    return {
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['validateToken']),
    onClick () {
      this.validateToken(this.token)
    },
    logout () {
      this.$store.commit('logout')
      this.$router.push('/login')
      Toast({
        message: '登出成功',
        duration: 1000
      })
    }
  }
}
</script>