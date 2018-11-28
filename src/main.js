import Vue from 'vue'
import 'amfe-flexible/index.min.js'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './plugins/toast'

import { IS_ONLINE } from './utils/config'
import { noAccessToken } from './utils/userAuth'
Vue.config.productionTip = false
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => {
    // console.log(window.location)
    if (noAccessToken() && IS_ONLINE) {
      return store.dispatch('getAccessToken')
    }
    return h(App)
  }
}).$mount('#app')
