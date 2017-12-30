<template>
  <div class="wrapper">
    <div class="acn-cell">
      <img class="avatar-circle" :src="user.avatar_url">
      <span class="content">{{user.loginname}}</span>
    </div>
    <div class="acn-cell" style="margin-top: 20px">用户ID:{{user.id}}</div>
    <div class="acn-cell">收藏文章</div>
    <div class="acn-cell">阅读历史</div>
    <div class="acn-cell" @click="logout">登出</div>
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

<style lang="scss" scoped>
.wrapper{
  height: calc(100vh - 90px);
}

</style>