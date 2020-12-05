import * as types from "./mutations-type"

export default {                                      // action处理的内容是，修改state之前的异步操作
  aaddStudent(context, student) {           
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
      
        context.commit(types.ADDSTUDENT, student)       // 通过dispatch，将内容传递到actions，然后actions经过异步延时之后在调用commit去到mutations

        resolve("已经成功提交")                    // 如果想得知vuex内部已经完成了state的修改，可以通过Promise的then进行优雅的表达

      }, 1000)
    })
  }
}