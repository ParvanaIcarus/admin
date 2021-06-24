import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 使用 element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引用全局樣式
import './assets/css/base.css'
// 字體樣式
import './assets/fonts/iconfont.css'

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
