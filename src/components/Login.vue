<template>
  <div>
    <mt-field label="Token" placeholder="请输入Token进行登录" v-model="inputToken"></mt-field>
    <mt-button type="default" @click="onSubmit">登录</mt-button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      inputToken: ''
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      console.log('From ' + from.name)
      vm.fromRoute = from.name
    })
  },
  methods: {
    onSubmit () {
      // do sth
      console.log('Submitted with token ' + this.inputToken)
      this.$store.dispatch('login', this.inputToken)
      .then(res => {
        this.$router.push(this.fromRoute)
      })
    }
  }
}
</script>