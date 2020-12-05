import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
import moduleA from "./modules/moduleA"

// 作为插件，第一步需要在自己的index.js中，被Vue的use方法注册（调用该插件内部的install方法）
Vue.use(Vuex)

const state = {      // state和Vue对象中的data一样，是响应式的
  name: "ls",
  counter: 1,
  students: [
    {
      name: "hsj",
      age: 18,
      height: 1.88
    },
    {
      name: "yga",
      age: 17,
      height: 1.5
    },
    {
      name: "wyz",
      age: 28,
      height: 1.87
    }
  ]
}

// 第二步，创建对应的对象，这里并不是直接使用vuex，而是使用vuex中的Store对象
const store = new Vuex.Store({      // vue推荐使用“单一状态树”，也就是这里不要创建多个Store，创建多个Store看似好像把数据分的更加详细，实际上不太好维护
  state,
  mutations,
  getters,
  actions,
  modules: {
    a: moduleA
  }

})

// 第三步，导出创建的对象
export default store