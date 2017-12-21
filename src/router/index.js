import Vue from 'vue'
import Router from 'vue-router'
import Topics from '@/components/Topics'
import Content from '@/components/Content'
import User from '@/components/User'
import MyPage from '@/components/MyPage'
import Login from '@/components/Login'
import Messages from '@/components/Messages'
import Post from '@/components/Post'
import store from '../store'
import { Toast } from 'mint-ui'

Vue.use(Router)

function loginCheck (to, from, next) {
  if (!store.state.isLogin) {
    Toast({message: '请先登录', duration: 1000})
    return next('/login')
  }
  return next()
}

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'home',
      component: Topics
    },
    {
      path: '/topic/:id',
      name: 'content',
      component: Content,
      props: true
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User,
      props: true
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages,
      beforeEnter: loginCheck
    },
    {
      path: '/what',
      name: 'what'
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage,
      beforeEnter: loginCheck
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    }
  ]
})
