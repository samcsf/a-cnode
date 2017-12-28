<template>
  <mt-loadmore :top-method="loadTop" ref="loadmore"> 
    <ul  v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="0"
      infinite-scroll-immediate-check="false">
      <li v-for="(topic, idx) in topics"  @click="redirectTo(topic)" :key="'topic'+idx">
        <mt-cell :title="topic.title" :label="getViewState(topic)">
          <span>{{topic.last_reply_at | timeAgo}}</span>
          <img v-show="topic.last_reply_avatar" :src="topic.last_reply_avatar" class="avatar-small">
          <img slot="icon" :src="topic.author.avatar_url" class="avatar-small">
        </mt-cell>
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
import {mapState, mapActions} from 'vuex'

export default {
  data: function () {
    return {
      loading: false,
      page: 1
    }
  },
  computed: {
    ...mapState(['topics'])
  },
  methods: {
    ...mapActions(['fetchTopicsWithDetail']),
    loadTop () {
      this.page = 1 // reset page!
      return this.fetchTopicsWithDetail({page: this.page, refresh: true})
      .then(() => {
        this.$refs.loadmore.onTopLoaded()
      })
    },
    loadMore () {
      this.loading = true
      this.page++
      console.log('loading ' + this.page)
      return this.fetchTopicsWithDetail({page: this.page, refresh: false})
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
    numFilter: function (value) {
      return this.formatNum(value)
    }
  }
}
</script>