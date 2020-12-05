import * as types from "./mutations-type"
import Vue from "vue"

export default{
  [types.INCREASE](state, adder) {     // 这里通过mutation统一对state中的数据进行管理，组件中通过commit来调用mutation中的方法
    state.counter += adder
  },
  [types.DECREASE](state, subtracter) { // 这种[DECREASE]的写法，就是调用宏定义的名称来给函数命名而已，因为不加中括号就会把DECREASE作为函数名
    state.counter -= subtracter
  },
  [types.ADDSTUDENT](state, student) {       // mutations的普通commit方式
    state.students.push(student)
  },
  // [ADDSTUDENT](state, payload) {          // mutations的特殊commit方式
  //   state.students.push(payload.student)     
  // },
  [types.ADDSTUDENTHOBBY](state, hobby) {
    // state.students[0]['hobby'] = hobby   // 可以这样通过["key"] = value的方式动态添加对象中的属性，但是因为这个属性并不在响应式系统中，所以不会动态刷新


    Vue.set(state.students[0], "hobby", hobby)    // 上面一行的代码确实可以动态添加属性，但是并不是响应式的，也就是没有加入到响应式系统中
                                                  // 如果想要添加到响应式系统中一起刷新的话，可以采用Vue.set的方法进行添加，具体参数可以在打出括号的时候查看智能提示
    
    // delete state.students[0].age            // 如果想要删除某一个属性，可以通过delete方法进行删除，不过同样的，并不是响应式的

    // Vue.delete(state.students[0], "age")          // 通过Vue对象的方法，响应式的删除对象属性
  }
}