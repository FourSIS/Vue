import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,                  // 跟router一样，直接挂载到Vue对象中，内部会生成一个prototype.$store，这样在每一个vue组件中都可以调用$store
  render: h => h(App),
})
