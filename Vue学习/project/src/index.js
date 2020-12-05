require('./css/normal.less')

import Vue from "vue"
import App from './vue/app'
import Counter from './vue/counter'

const app = new Vue({
  el: '#test',
  template:   '<div><cpn/></div>',
  components: { 
    cpn: Counter
  }
})