<template>
  <div>
    <div class="info-block">
      <span class="info-header">未读消息</span>
      <router-link class="info-entry" v-for="(msg, idx) in messages.hasnot_read_messages" :to="'/topic/' + msg.topic.id" :key="idx">{{msg.topic.title}}</router-link>
    </div>
    <div class="info-block">
      <span class="info-header">历史消息</span>
      <router-link class="info-entry" v-for="(msg, idx) in messages.has_read_messages" :to="'/topic/' + msg.topic.id" :key="idx">{{msg.topic.title}}</router-link>
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