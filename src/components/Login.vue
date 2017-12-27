<template>
  <div>
    <mt-field label="Token" placeholder="请输入Token进行登录" v-model="inputToken"></mt-field>
    <mt-button type="default" @click="onSubmit">登录</mt-button>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import store from '../store'
export default {
  data: function () {
    return {
      inputToken: ''
    }
  },
  beforeRouteEnter: (to, from, next) => {
    if (store.state.isLogin) {
      Toast({message: '已登录', duration: 1000})
      return next(to.query.to || 'home')
    }
  },
  methods: {
    onSubmit () {
      console.log('Submitted with token ' + this.inputToken)
      this.$store.dispatch('login', this.inputToken)
      .then(res => {
        Toast({message: '登录成功', duration: 1000})
        this.$router.push(this.$route.query.to || 'home')
      })
      .catch(e => {
        Toast({message: 'Token 错误, 请重新输入', duration: 1000})
        console.log('Error when login: ' + e)
      })
    }
  }
}
</script>