import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  topics: [],
  user: null,
  token: '',
  isLogin: false,
  messages: {
    has_read_messages: [],
    hasnot_read_messages: []
  },
  messageCount: 0,
  msgSchId: '',
  config: {
    pageLimit: 20
  },
  topicPage: 1,
  topicTab: '',
  collections: []
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
