import {
  ADD_CART,
  ADD_COUNT
} from "./mutation-types"

export default {
  [ADD_COUNT](state, payload) {
    payload.count++
  },

  [ADD_CART](state, payload) {
    payload.checked = true        // checked属性用于后面在购物车中是否显示勾选，不要在details里面加，让detail里面的内容更加简单，实用
    state.cartList.push(payload)
  }
}