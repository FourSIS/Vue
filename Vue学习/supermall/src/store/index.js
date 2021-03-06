import Vue from "vue"
import Vuex from "vuex"

import actions from "./actions"
import mutations from "./mutations"
import getters from "./getters"

// 注册插件
Vue.use(Vuex)

const state = {
  cartList: []
}

// 使用组件
const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

// 组件导出
export default store