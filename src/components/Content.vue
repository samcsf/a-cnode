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
    <div v-if="!details.replies || details.replies.length<=0">暂无评论</div>
    <div v-for="(reply, idx) in details.replies" class="reply markdown-body" :key="idx">
      <router-link :to="'/user/' + reply.author.loginname"><img class="avatar-medium" :src="reply.author.avatar_url" /></router-link>
      <router-link :to="'/user/' + reply.author.loginname"><b>{{reply.author.loginname}}</b></router-link>
      <span>@</span>
      <span>{{reply.create_at | timeAgo}}</span>
      <span>
        <a title="赞" href="#" @click.prevent="submitLike(reply)">
          <span v-if="!reply.is_uped" class="glyphicon glyphicon-thumbs-up"></span>
          <span v-else class="glyphicon glyphicon-thumbs-up" style="color:grey"></span>
        </a>
        <span v-show="reply.ups.length">{{reply.ups.length}}</span>
        <a href="#" title="回复" @click.prevent="toggleReply(reply, idx)"><span class="glyphicon glyphicon-pencil"></span></a>
      </span>
      <div v-html="reply.content" />
      <div :class="'reply-wrapper ' + (idx == replyIdx ? 'flex on' : 'flex')">
        <mt-field label="回复" placeholder="请输入回复内容" type="textarea" v-model="tmpReply"></mt-field>
        <mt-button type="default" style="width:100%" :disabled="!submitAvaliable" @click="submitReply">发布回复</mt-button>
      </div>
    </div>
    <div v-if="isLogin" class="reply-wrapper">
      <mt-field label="回复" placeholder="请输入回复内容" type="textarea" v-model="inputContent"></mt-field>
      <mt-button type="default" style="width:100%" :disabled="!submitAvaliable" @click="submitReply">发布回复</mt-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import localeDate from '@/utils/date'
import mapping from '@/utils/mapping'
import {Indicator, Toast} from 'mint-ui'
import {mapState} from 'vuex'

export default {
  data: function () {
    return {
      loading: true,
      details: {
        author: {
          avatar_url: '#'
        }
      },
      submitAvaliable: true,
      inputContent: '',
      tmpReply: '',
      replyId: '',
      replyIdx: -1
    }
  },
  props: ['id'],
  created () {
    this.loadTopic()
  },
  filters: {
    timeAgo (date) {
      let dateUtil = localeDate('zh-cn')
      return dateUtil.getDuration(date, new Date())
    },
    getTabName (tab) {
      return mapping.tabs[tab] || '未知'
    }
  },
  computed: {
    ...mapState(['isLogin', 'token'])
  },
  methods: {
    loadTopic () {
      Indicator.open()
      let accesstoken = this.isLogin ? '?accesstoken=' + this.token : ''
      return axios.get('https://cnodejs.org/api/v1/topic/' + this.id + accesstoken)
      .then(res => {
        this.details = res.data.data
        Indicator.close()
      })
    },
    initTmpReply (name) {
      this.tmpReply = `[@${name}](/user/${name}) `
    },
    toggleReply (reply, idx) {
      if (!this.isLogin) {
        return Toast('尚未登录')
      }
      if (idx === -1) {
        return
      }
      this.replyIdx = this.replyIdx === idx ? -1 : idx
      if (this.replyIdx > -1) {
        this.initTmpReply(reply.author.loginname)
        this.replyId = reply.id
      } else {
        this.replyId = ''
      }
    },
    submitReply () {
      if (!this.submitAvaliable) {
        return Toast('操作进行中，请稍等重试')
      }
      this.submitAvaliable = false
      let reply = {
        accesstoken: this.token,
        content: this.inputContent
      }
      if (this.replyId !== '') {
        reply.reply_id = this.replyId
        reply.content = this.tmpReply
      }
      console.log('Posting ' + JSON.stringify(reply))
      return axios.post('https://cnodejs.org/api/v1/topic/' + this.id + '/replies', reply)
      .then(res => {
        this.submitAvaliable = true
        this.loadTopic() // refresh topic
        this.toggleReply(null, this.replyIdx) // close reply input
        if (this.inputContent) {
          this.inputContent = '' // clear if any text
        }
        Toast('评论成功')
      }).catch(err => {
        console.log(err)
        if (err.response && err.response.data) {
          Toast('错误:' + err.response.data.error_msg)
        }
        this.submitAvaliable = true
      })
    },
    submitLike (reply) {
      if (!this.isLogin) {
        return Toast('尚未登录')
      }
      if (!this.submitAvaliable) {
        return Toast('操作进行中，请稍等重试')
      }
      this.submitAvaliable = false
      let data = {
        accesstoken: this.token
      }
      return axios.post('https://cnodejs.org/api/v1/reply/' + reply.id + '/ups', data)
      .then(res => {
        if (res.data.action === 'up') {
          Toast('点赞成功')
          reply.is_uped = true
          reply.ups.push('dummy')
        } else {
          Toast('取消点赞')
          reply.is_uped = false
          reply.ups.pop()
        }
        this.submitAvaliable = true
      }).catch(err => {
        console.log(err)
        if (err.response && err.response.data) {
          Toast('错误:' + err.response.data.error_msg)
        } else {
          Toast('操作失败')
        }
        this.submitAvaliable = true
      })
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
    margin-bottom: 10px;
  }

  .reply-wrapper {
    margin-top: 10px;
    padding-bottom: 5px;
  }

  .reply-wrapper.flex {
    height: 0px;
    overflow: hidden;
    transition: height ease 0.5s;
  }

  .reply-wrapper.flex.on {
    height: 115px;
    overflow: hidden;
  }
  
</style>