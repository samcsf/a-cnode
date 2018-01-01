<template>
  <div>
    <div class="info-block">
      <span class="info-entry header">未读消息</span>
      <div class="info-entry" v-for="(msg, idx) in messages.hasnot_read_messages" :key="idx">
        <router-link :to="'/user/' + msg.author.loginname">{{msg.author.loginname}}</router-link>
        <span v-if="msg.type==='at'">@了你</span>
        <span v-if="msg.type==='reply'">回复了你</span>
        <router-link :to="'/topic/' + msg.topic.id">{{msg.topic.title}}</router-link>
      </div>
    </div>
    <div class="info-block">
      <span class="info-entry header">历史消息</span>
      <div class="info-entry" v-for="(msg, idx) in messages.has_read_messages" :key="idx">
        <router-link :to="'/user/' + msg.author.loginname">{{msg.author.loginname}}</router-link>
        <span v-if="msg.type==='at'">@了你</span>
        <span v-if="msg.type==='reply'">回复了你</span>
        <router-link :to="'/topic/' + msg.topic.id">{{msg.topic.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  data: function () {
    return {
    }
  },
  computed: {
    ...mapState(['messages'])
  },
  methods: {
    ...mapActions([])
  }
}
</script>