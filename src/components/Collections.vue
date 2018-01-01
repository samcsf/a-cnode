<template>
    <mt-loadmore :top-method="loadTop" ref="loadmore"> 
    <ul id="topic-list" >
      <li v-for="(topic, idx) in topics" :key="'topic'+idx">
        <div class="topic-cell">
          <div class="detail">
            <router-link :to="'/user/' + topic.author.loginname">
              <img :src="topic.author.avatar_url" class="avatar-medium avatar">
            </router-link>
            <div class="content">
              <router-link :to="'/user/' + topic.author.loginname">{{topic.author.loginname}}</router-link>
              <ul>
                <li>发布于{{topic.create_at | timeAgo}}</li>
                <li>-</li>
                <li>来自#{{topic.tab | getTabName}}</li>
                <li v-if="topic.good"><span class="short-mark green">精</span></li>
              </ul>
            </div>
          </div>
          <router-link class="title" :to="'/topic/'+ topic.id">{{topic.title}}</router-link>
          <ul class="view-state">
            <li>
              <img class="icon" src="../../static/view.png">
              {{topic.visit_count | numFilter}}
            </li>
            <li>
              <img class="icon" src="../../static/reply.png">
              {{topic.reply_count | numFilter}}
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div v-show="loading" class="flex-center" style="margin-top: 10px">
      <mt-spinner type="fading-circle"></mt-spinner>
      <span>加载中...</span>
    </div>
    </mt-loadmore>
</template>

<script>
import localeDate from '@/utils/date'
import mapping from '@/utils/mapping'
import {mapState, mapActions} from 'vuex'

export default {
  data: function () {
    return {
      loading: false
    }
  },
  created () {
    this.fetchCollections()
  },
  computed: {
    ...mapState({topics: 'collections'})
  },
  methods: {
    ...mapActions(['fetchCollections']),
    loadTop () {
      return this.fetchCollections()
      .then(() => {
        this.$refs.loadmore.onTopLoaded()
      })
    },
    formatNum (value) {
      if (value < 1000) {
        return value
      }
      return parseFloat(parseInt(value / 100) / 10) + 'k'
    },
    getViewState (data) {
      return this.formatNum(data.reply_count) + '/' + this.formatNum(data.visit_count)
    },
    redirectTo (topic) {
      this.$router.push({name: 'content', params: { id: topic.id }})
    }
  },
  filters: {
    timeAgo (date) {
      let dateUtil = localeDate('zh-cn')
      return dateUtil.getDuration(date, new Date())
    },
    numFilter (value) {
      if (value < 1000) {
        return value
      }
      return parseFloat(parseInt(value / 100) / 10) + 'k'
    },
    getTabName (tab) {
      return mapping.tabs[tab] || '未知'
    }
  }
}
</script>