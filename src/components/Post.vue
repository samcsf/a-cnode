<template>
  <div>
    <div class="my-input">
      <span class="my-input-label">分类</span>
      <select v-model="inputTab">
        <option v-for="opt in Object.keys(tabs)" :value="opt">{{tabs[opt]}}</option>
      </select>
      <span class="triangle"></span>
    </div>
    <mt-field label="主题" placeholder="请输入主题" v-model="inputTitle"></mt-field>
    <mt-field label="内容" placeholder="请输入内容" type="textarea" rows="10" v-model="inputContent"></mt-field>
    <mt-button type="default" style="width:100%" :disabled="!submitAvaliable" @click="submitTopic">发布</mt-button>
  </div>
</template>
<script>
import mapping from '../utils/mapping'
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
import {Toast} from 'mint-ui'
export default {
  data: function () {
    return {
      inputTitle: '',
      inputContent: '',
      inputTab: 'dev',
      tabs: mapping.tabs,
      submitAvaliable: true
    }
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    ...mapMutations(['switchTab']),
    submitTopic () {
      this.submitAvaliable = false
      let topic = {
        title: this.inputTitle,
        tab: this.inputTab,
        content: this.inputContent,
        accesstoken: this.token
      }
      console.log('Posting ' + JSON.stringify(topic))
      return axios.post('https://cnodejs.org/api/v1/topics', topic)
      .then(res => {
        let id = res.data.topic_id
        this.$router.push('/topic/' + id)
        this.submitAvaliable = true
      }).catch(err => {
        console.log(err)
        if (err.response && err.response.data) {
          Toast('错误:' + err.response.data.error_msg)
        }
        this.submitAvaliable = true
      })
    }
  }
}
</script>

<style lang="scss">
.my-input {
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  background-color: white;
  .my-input-label {
    margin-left: 10px;
  }
  select {
    margin-left: 70px;
    font-size: 16px;
    appearance: none;
    padding-left: 5px;
    padding-right: 18px;
    background-color: transparent;
    border: none;
  }
}

.triangle {
  width: 0;
  height: 0;
  display: inline-block;
  border: 6px solid transparent;
  border-top-color: #2c3e50;
  top: 3px;
  left: -23px;
  position: relative;
}
</style>