import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
console.log(App);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // render: h => h(App)
  render: function (createElement) {  
    // return createElement('h2', {class: 'box'}, ['hello world'])
    return createElement(App)
  }
})
