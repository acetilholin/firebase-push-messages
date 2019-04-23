import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueGlobalVariable from 'vue-global-var'

Vue.use(vueGlobalVariable, {
  globals: {
    user: null,
    subscribed: null
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
