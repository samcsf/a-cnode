<template>
  <div class="content-wrapper">
    <h1>{{details.title}}</h1>
    <div class="author-info">
      <img class="avatar" :src="details.author.avatar_url" />
      <span>{{details.author.loginname}}</span>
      <span>发布于</span>
      <span>{{details.create_at | timeAgo}}</span>
      <br>
      <span>{{details.visit_count}}阅读</span>
      <span>来自&nbsp{{details.tab | getTabName}}</span>
    </div>
    <div v-html="details.content" class="content-body markdown-body"></div>
    <h1>评论</h1>
    <div v-for="reply in details.replies" class="reply markdown-body">
      <img class="avatar" :src="reply.author.avatar_url" />
      <span><b>{{reply.author.loginname}}</b></span>
      <span>@</span>
      <span>{{reply.create_at | timeAgo}}</span>
      <div v-html="reply.content" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import localeDate from '@/utils/date'
import mapping from '@/utils/mapping'

export default {
  data: function () {
    return {
      details: {}
    }
  },
  props: ['id'],
  created () {
    axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
    .then(res => {
      this.details = res.data.data
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
    .avatar {
      width: 20px;
      height: 20px;
      border-radius: 2px;
    }
    
    span {
      text-align: center;
    }
    border-bottom: 1px solid lightgrey;
    margin-bottom: 10px;
  }

  .reply {
    border-bottom: 1px solid black;
    margin-bottom: 10px;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 5px;
    }
  }

  
</style>