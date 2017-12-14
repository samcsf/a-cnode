<template>
  <mt-loadmore :top-method="loadTop" ref="loadmore">
    <div v-for="(topic, idx) in topics"  @click="redirectTo(topic)">
      <mt-cell :title="topic.title" :label="getViewState(topic)" :key="idx" >
        <span>{{dateUtil.getDuration(topic.last_reply_at, new Date())}}</span>
        <img v-show="topic.last_reply_avatar" :src="topic.last_reply_avatar" width="24" height="24">
        <img slot="icon" :src="topic.author.avatar_url" width="24" height="24">
      </mt-cell>
    </div>
    </mt-loadmore>
</template>

<script>
import axios from 'axios'
import localeDate from '@/utils/date'
export default {
  data: function () {
    return {
      topics: []
    }
  },
  created () {
    this.dateUtil = localeDate('zh-cn')
  },
  mounted () {
    this.fetchTopics()
  },
  methods: {
    loadTop () {
      this.fetchTopics(this.$refs.loadmore.onTopLoaded)
    },
    fetchTopics (cb) {
      axios.get('https://cnodejs.org/api/v1/topics')
      .then(res => {
        console.log('Fetch topics @' + new Date().toLocaleString())
        this.topics = res.data.data.map(t => {
          t.last_reply_avatar = ''
          return t
        })
        this.fetchTopicDetails(this.topics)
        if (cb && typeof cb === 'function') {
          cb()
        }
      })
    },
    fetchTopicDetails (topics) {
      topics.forEach(async t => {
        await axios.get('https://cnodejs.org/api/v1/topic/' + t.id)
        .then(res => {
          let data = res.data.data
          let last = data.replies.length - 1
          t.last_reply_avatar = data.replies[last].author.avatar_url
        })
      })
      console.log('icons reloaded')
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
    numFilter: function (value) {
      return this.formatNum(value)
    }
  }
}
</script>