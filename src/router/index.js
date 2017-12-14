import Vue from 'vue'
import Router from 'vue-router'
import Topics from '@/components/Topics'
import Content from '@/components/Content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'topics',
      component: Topics
    },
    {
      path: '/topic/:id',
      name: 'content',
      component: Content,
      props: true
    }
  ]
})
