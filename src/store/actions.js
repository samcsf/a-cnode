import axios from 'axios'

export default {
  validateToken: async function ({commit, state}, token) {
    let res = null
    try {
      res = await axios.post('https://cnodejs.org/api/v1/accesstoken', {accesstoken: token})
    } catch (error) {
      return undefined
    }
    console.log('Login as ' + res.data.loginname)
    return res.data
  },
  fetchTopics: async function ({commit, state}, opts) {
    if (!opts.limit) {
      opts.limit = state.config.pageLimit
    }
    return axios.get('https://cnodejs.org/api/v1/topics', {
      params: {
        ...opts
      }
    })
    .then(res => {
      console.log('Fetch topics @' + new Date().toLocaleString())
      let topics = res.data.data.map(t => {
        t.last_reply_avatar = ''
        return t
      })
      if (opts.refresh) {
        commit('refreshTopics', topics)
      } else {
        commit('appendTopics', topics)
      }
    })
  },
  fetchTopicsWithDetail: async function ({commit, state}, opts) {
    if (!opts.limit) {
      opts.limit = state.config.pageLimit
    }
    return axios.get('https://cnodejs.org/api/v1/topics', {
      params: {
        ...opts
      }
    })
    .then(res => {
      console.log('Fetch topics @' + new Date().toLocaleString())
      let topics = res.data.data.map(t => {
        t.last_reply_avatar = ''
        return t
      })
      return Promise.resolve(topics)
    })
    .then(topics => {
      topics.forEach((t, idx) => {
        axios.get('https://cnodejs.org/api/v1/topic/' + t.id)
        .then(res => {
          let data = res.data.data
          let last = data.replies.length - 1
          if (last >= 0) {
            t.last_reply_avatar = data.replies[last].author.avatar_url
          } else {
            t.last_reply_avatar = ''
          }
        })
      })
      console.log('Reply avatars loaded.')
      if (opts.refresh) {
        commit('refreshTopics', topics)
      } else {
        commit('appendTopics', topics)
      }
    })
  },
  getMessages: async function ({commit, state}, opts) {
    return axios.get('https://cnodejs.org/api/v1/messages?accesstoken=' + state.token)
    .then(res => {
      state.messages = res.data.data
    }).catch(err => console.log(err))
  },
  getMessageCount: async function ({commit, state}, opts) {
    return axios.get('https://cnodejs.org/api/v1/message/count?accesstoken=' + state.token)
    .then(res => {
      state.messageCount = res.data.data
      console.log('Message count updated @' + new Date().toLocaleString())
    }).catch(err => console.log(err))
  },
  login: async function ({commit, state, dispatch}, token) {
    return dispatch('validateToken', token)
    .then(res => {
      if (!res) {
        throw new Error('Invaild token.')
      }
      // update message count per minute
      let msgSchId = setInterval(() => dispatch('getMessageCount'), 1000 * 60)
      commit('initUserData', {token, user: res, msgSchId})
      dispatch('getMessages')
      dispatch('getMessageCount')
    })
  }
}
