import axios from 'axios'
import {Toast} from 'mint-ui'

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
    return axios.get('https://cnodejs.org/api/v1/topics')
    .then(res => {
      console.log('Fetch topics @' + new Date().toLocaleString())
      let topics = res.data.data.map(t => {
        t.last_reply_avatar = ''
        return t
      })
      commit('refreshTopics', topics)
    })
  },
  fetchTopicsWithDetail: async function ({commit, state}, opts) {
    return axios.get('https://cnodejs.org/api/v1/topics')
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
      commit('refreshTopics', topics)
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
    }).catch(err => console.log(err))
  },
  login: async function ({commit, state, dispatch}, token) {
    return dispatch('validateToken', token)
    .then(res => {
      if (!res) {
        return Toast('Token 错误')
      }
      commit('initUserData', {token, user: res})
      Toast({
        message: '登录成功',
        duration: 1000
      })
      dispatch('getMessages')
      dispatch('getMessageCount')
    })
  }
}
