export default {
  state: {
    name: "zs"
  },
  getters: {
    peopleName(state, getters, rootState) {   // 在modules中使用state，默认就是modules中的state，如果想要拿到Vuex中的state，那么就需要使用第三个参数，一般命名为rootStateo
      return rootState.students
    }
  },
  actions: {
    // achangeStuName(context) {     // 这里的context参数中的commit只针对module中的mutations，无法使用Vuex中的mutations
    //   setTimeout( () => {
    //     console.log(context);
    //   }, 1000)
    // }
    
    achangeStuName({state, getters}) {      // ES6中可以采用参数解构的写法，将对象中的变量直接提取出来，下面可以直接使用，而没有被结构的对象就无法使用了，所以，在明确知道需要使用什么对象的时候用解构很舒服
      setTimeout( () => {
        console.log(state);   
      }, 1000)
    }
  }
}