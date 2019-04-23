import Vue from 'vue'
import Router from 'vue-router'
import Push from './views/Push.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Push',
      component: Push
    }
  ]
})
