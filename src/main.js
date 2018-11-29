import Vue from 'vue'
import 'amfe-flexible/index.min.js'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './plugins/toast'

import { IS_ONLINE } from './utils/config'
import { formatYMDHMS, formatYMD, formatMD } from './utils/util'
import { noAccessToken } from './utils/userAuth'
Vue.config.productionTip = false
Vue.filter('formatYMDHMS', formatYMDHMS)
Vue.filter('formatYMD', formatYMD)
Vue.filter('formatMD', formatMD)
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => {
    if (noAccessToken() && IS_ONLINE) {
      return store.dispatch('getAccessToken')
    }
    return h(App)
  }
}).$mount('#app')
