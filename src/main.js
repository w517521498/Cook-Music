import Vue from 'vue'
import App from './App.vue'
import './style/reset.css'
import store from './store'
// 引入样式重置文件
import 'animate.css/animate.css'
import router from './router'
import axios from  './utils/axios'
import VueLazyload from  'vue-lazyload'
Vue.config.productionTip = false
// Vue.prototype.$axios = axios 
// 将 axios 挂载到vue的原型上  组件继承实例,所以vue原型上的属性组件也有

// 图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/favicon.ico',
  loading: '/favicon.ico',
  attempt: 1
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
