import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from "axios";

Vue.config.productionTip = false
//获取数据路径的格式
Vue.prototype.$http=axios;

//定义获取数据URL地址
axios.defaults.baseURL="http://localhost:8081"

Vue.use(router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
