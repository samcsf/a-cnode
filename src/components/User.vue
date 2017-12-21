<template>
  <div class="user-wrapper">
    <div class="user-info" v-show="!loading">
      <img class="avatar-large" :src="user.avatar_url" />
      <div class="user-details">
        <div class='user-name'>{{user.loginname}}</div>
        <div><b>积分:</b>{{user.score}}</div>
        <div>注册于{{user.create_at | timeAgo}}</div>
      </div>
    </div>
    <div class="info-block">
      <span class="info-header">最近创建的话题</span>
      <router-link class="info-entry" v-for="(topic, idx) in user.recent_topics" :to="'/topic/' + topic.id" :key="idx">{{topic.title}}</router-link>
    </div>
    <div class="info-block">
      <span class="info-header">最近参与的话题</span>
      <router-link class="info-entry" v-for="(topic, idx) in user.recent_replies" :to="'/topic/' + topic.id" :key="idx">{{topic.title}}</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import localeDate from '@/utils/date'
export default {
  props: ['id'],
  data: function () {
    return {
      loading: true,
      user: {}
    }
  },
  created () {
    axios.get('https://cnodejs.org/api/v1/user/' + this.id)
    .then(res => {
      this.user = res.data.data
      this.loading = false
    })
  },
  filters: {
    timeAgo (date) {
      let dateUtil = localeDate('zh-cn')
      return dateUtil.getDuration(date, new Date())
    }
  }
}
</script>

<style lang="scss">
  .user-wrapper {
    margin-top: 60px;
  }
  .user-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .user-details {
      margin-left: 10px;
      margin-top: 18px;
    }
  }
  .user-name {
    font-size: 30px;
  }
</style>