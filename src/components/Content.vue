<template>
  <div class="content-wrapper">
    <h1>{{details.title}}</h1>
    <div class="author-info">
      <img class="avatar-small" :src="details.author.avatar_url" />
      <router-link :to="'/user/' + details.author.loginname">{{details.author.loginname}}</router-link>
      <span>发布于</span>
      <span>{{details.create_at | timeAgo}}</span>
      <br>
      <span>{{details.visit_count}}阅读</span>
      <span>来自&nbsp{{details.tab | getTabName}}</span>
    </div>
    <div v-html="details.content" class="content-body markdown-body"></div>
    <h1>评论</h1>
    <h2 v-if="!details.replies || details.replies.length<=0">暂无评论</h2>
    <div v-for="(reply, idx) in details.replies" class="reply markdown-body" :key="idx">
      <router-link :to="'/user/' + reply.author.loginname"><img class="avatar-medium" :src="reply.author.avatar_url" /></router-link>
      <router-link :to="'/user/' + reply.author.loginname"><b>{{reply.author.loginname}}</b></router-link>
      <span>@</span>
      <span>{{reply.create_at | timeAgo}}</span>
      <a href="#">赞</a>
      <a href="#">回</a>
      <div v-html="reply.content" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import localeDate from '@/utils/date'
import mapping from '@/utils/mapping'
import { Indicator } from 'mint-ui'

export default {
  data: function () {
    return {
      loading: true,
      details: {
        author: {
          avatar_url: '#'
        }
      }
    }
  },
  props: ['id'],
  created () {
    Indicator.open()
    axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
    .then(res => {
      this.details = res.data.data
      Indicator.close()
    })
  },
  filters: {
    timeAgo (date) {
      let dateUtil = localeDate('zh-cn')
      return dateUtil.getDuration(date, new Date())
    },
    getTabName (tab) {
      return mapping.tabs[tab] || '未知'
    }
  }
}
</script>

<style lang="scss">
  .content-wrapper{
    img {
      height: auto;
      max-width: 100%;
      vertical-align: middle;
      border: 0;
    }
    a {
      word-break: break-all;
    }
  }

  .content-body{
  }  

  .author-info{
    span {
      text-align: center;
    }
    border-bottom: 1px solid lightgrey;
    margin-bottom: 10px;
  }

  .reply {
    border-bottom: 1px solid black;
    margin-bottom: 10px;
  }

  
</style>