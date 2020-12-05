export default {              // getters相当于computed，定义计算属性
  square(state) {
    return state.counter * state.counter
  },
  more180(state) {
    return state.students.filter( (student) => student.height > 1.8)      // 回忆对数组常用的三种操作函数filter,map,reduce
  },
  more180Number(state, getters) {              // getter的参数除了可以传递state，也可以使用getters，这里的getters可以调用其他getters方法
    return getters.more180.length
  },
  moreAgeFunc(state) {      // 返回年龄大于age的student，但是这里的age是前端动态输入的
    return function(age) {  // 返回一个函数，这样在调用getters中的这个方法的时候可以拿到这个返回值，也就是这个函数，进而在传递一个参数，可以实现动态挑选返回对象
      return state.students.filter( (student) => student.age > age)
    }
  }
}