<template>
  <mt-loadmore :top-method="loadTop" ref="loadmore"> 
    <ul id="topic-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="0"
      infinite-scroll-immediate-check="false">
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
                <li v-if="topic.top"><span class="short-mark blue">顶</span></li>
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
            <li v-show="topic.last_reply_avatar">
              <img :src="topic.last_reply_avatar" class="avatar-tiny">
              {{topic.last_reply_at | timeAgo}}
            </li>
          </ul>
        </div>
        <!-- <mt-cell :title="topic.title" :label="getViewState(topic)">
          <span>{{topic.last_reply_at | timeAgo}}</span>
          <img v-show="topic.last_reply_avatar" :src="topic.last_reply_avatar" class="avatar-small">
          <img slot="icon" :src="topic.author.avatar_url" class="avatar-small">
        </mt-cell> -->
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
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  data: function () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState(['topics', 'topicPage'])
  },
  methods: {
    ...mapActions(['fetchTopicsWithDetail']),
    ...mapMutations(['initPage', 'nextPage']),
    loadTop () {
      this.initPage() // reset page!
      return this.fetchTopicsWithDetail({page: this.topicPage, refresh: true})
      .then(() => {
        this.$refs.loadmore.onTopLoaded()
      })
    },
    loadMore () {
      this.loading = true
      this.nextPage()
      console.log('loading ' + this.topicPage)
      return this.fetchTopicsWithDetail({page: this.topicPage, refresh: false})
      .then(() => { this.loading = false })
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

<style lang="scss">
#topic-list {
  margin-top: 5px;
}


  
</style>