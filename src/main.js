import Vue from 'vue'
import App from './App'
import router from './router'
import VuePreview from 'vue-preview'
import store from './store'

Vue.config.productionTip = false

Vue.use(VuePreview)
//引入mint-ui
// import MintUi from 'mint-ui'
// Vue.use(MintUi)
// 
import mintUI from './util/mintUI.js'
Vue.use(mintUI)
// import 'mint-ui/lib/style.min.css'

// 全局样式
import '../static/css/global.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
