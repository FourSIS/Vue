import {
  ADD_CART,
  ADD_COUNT
} from "./mutation-types"

export default {
  addCart(context, payload) {
    return new Promise( (resolve, reject) => {
      // 查找：在原先的数组中查找，返回和payload的iid相同的对象
      // let exitProduct = null
      // for(product of state.cartList) {
      //   if(payload.iid === product.iid) {
      //     exitProduct = product
      //   }
      // }
      
      // 使用find方法可以一行代码解决
      let exitProduct = context.state.cartList.find( product => product.iid === payload.iid)

      if(exitProduct) {
        context.commit(ADD_COUNT, exitProduct)
        resolve("该商品数量+1")
      } else {
        payload.count = 1
        context.commit(ADD_CART, payload)
        resolve("已添加新商品")
      }
    })
  }
}