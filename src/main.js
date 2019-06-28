import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'// 不导入这个css就没有样式，注意
import App from './App.vue'
import 'nprogress/nprogress.css'
import axios from 'axios'
import { getUser } from '@/utils/auth'
import JSONBigInt from 'json-bigint'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0'
// axios拦截器
axios.interceptors.request.use(function (config) {
  // 后台接口除了登录其他的都需要令牌(token)，而所有的请求都经过这个拦截器
  if (getUser()) {
    config.headers.authorization = `Bearer ${getUser().token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response.data.data
}, function (error) {
  return Promise.reject(error)
})

axios.defaults.transformResponse = [function (data, headers) {
  return JSONBigInt.parse(data)
}]
Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
