export default {
  refreshTopics: function (state, topics) {
    state.topics.splice(0)
    state.topics = topics
  },
  logout: function (state) {
    state.token = ''
    state.user = null
    state.isLogin = false
    window.localStorage.removeItem('acnode_token')
  },
  initUserData: function (state, {user, token}) {
    state.token = token
    state.user = user
    state.isLogin = true
    window.localStorage.setItem('acnode_token', token)
  }
}
