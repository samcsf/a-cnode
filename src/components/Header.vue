<template>
  <mt-header fixed title="A-CNode" style="background-color:lightseagreen"> 
    <span v-if="showBack" tag='span' slot="left" style="font-size:18px;cursor:pointer;" @click="$router.go(-1)">{{"<"}}</span>
    <router-link v-if="$route.name === 'home'" tag='span' slot="right" style="font-size:18px;cursor:pointer;" to="/post">+</router-link>
    <select v-if="$route.name === 'home'" slot="left" @change="changeTab" v-model="tab">
      <option value="">全部</option>
      <option value="good">精华</option>
      <option value="ask">问答</option>
      <option value="job">招聘</option>
      <option value="dev">测试</option>
    </select>
  </mt-header>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  data: function () {
    return {
    }
  },
  computed: {
    ...mapState(['topicTab']),
    showBack () {
      let current = this.$route.name
      return current === 'content' || current === 'post' || current === 'user'
    },
    tab: {
      get () {
        return this.topicTab
      },
      set (tab) {
        this.switchTab(tab)
      }
    }
  },
  methods: {
    ...mapMutations(['switchTab', 'initPage']),
    ...mapActions(['fetchTopicsWithDetail']),
    changeTab () {
      document.documentElement.scrollTop = 0 // reset scrollTop
      document.body.scrollTop = 0 // not works, just in case
      this.initPage()
      this.fetchTopicsWithDetail({page: 1, refresh: true})
    }
  }
}
</script>
