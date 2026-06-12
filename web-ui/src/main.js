import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import VueMeta from 'vue-meta'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/global.css'

Vue.use(ElementUI)
Vue.use(VueMeta)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
