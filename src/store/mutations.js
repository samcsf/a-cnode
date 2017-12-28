export default {
  refreshTopics: function (state, topics) {
    state.topics.splice(0)
    state.topics = topics
  },
  appendTopics: function (state, topics) {
    state.topics = state.topics.concat(topics)
  },
  logout: function (state) {
    state.token = ''
    state.user = null
    state.isLogin = false
    clearInterval(state.msgSchId)
    window.localStorage.removeItem('acnode_token')
  },
  initUserData: function (state, {user, token, msgSchId}) {
    state.token = token
    state.user = user
    state.isLogin = true
    state.msgSchId = msgSchId
    window.localStorage.setItem('acnode_token', token)
  }
}
