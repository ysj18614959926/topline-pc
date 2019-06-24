import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'// 不导入这个css就没有样式，注意
import App from './App.vue'
import 'nprogress/nprogress.css'
Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
