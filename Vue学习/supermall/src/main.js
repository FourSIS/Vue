import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "./store"

import toast from "components/common/toast"
import fastClick from "fastclick"
import vueImageLoad from "vue-lazyload"

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()    // 定义事件总线 -- 事件总线其实就是一个Vue对象
Vue.use(toast)                    // 安装toast插件
Vue.use(vueImageLoad , {            // 图片懒加载   DOM写的时候是v-lazy
  loading: require("assets/img/home/placeholder.png")
})         
fastClick.attach(document.body)   // 解决移动端300ms的点击延迟


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
