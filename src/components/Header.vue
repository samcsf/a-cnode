<template>
  <mt-header fixed title="A-CNode" style="background-color:lightseagreen"> 
    <span v-if="showBack" tag='span' slot="left" style="font-size:18px;cursor:pointer;" @click="$router.go(-1)">{{"<"}}</span>
    <router-link v-if="$route.name === 'home'" tag='span' slot="right" style="font-size:18px;cursor:pointer;" to="/post">+</router-link>
    <div v-if="$route.name === 'home'" slot="left">
      <select @change="changeTab" v-model="tab" class="header-select">
        <option value="">全部</option>
        <option value="good">精华</option>
        <option value="ask">问答</option>
        <option value="job">招聘</option>
        <option value="dev">测试</option>
      </select>
      <span class="header-triangle"></span>
    </div>
  </mt-header>
</template>

<script>
import {Indicator} from 'mint-ui'
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
      Indicator.open('加载中')
      this.initPage()
      return this.fetchTopicsWithDetail({page: 1, refresh: true})
      .then(() => Indicator.close())
    }
  }
}
</script>

<style lang="scss">
  .header-select {
    font-size: 16px;
    appearance: none;
    padding-left: 5px;
    padding-right: 18px;
    background-color: transparent;
    border: none;
    position: relative;
  }

  .header-triangle {
    width: 0;
    height: 0;
    display: inline-block;
    border: 6px solid transparent;
    border-top-color: white;
    top: 3px;
    left: -18px;
    position: relative;
  }
</style>