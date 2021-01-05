// import Toast from "./Toast"

// const obj = {}

// // Vue.use(toast)会调用install方法，并且会传入一个参数Vue
// obj.install = function(Vue) {
  
//   // 1. 创建组件构造器
//   const toastConstructor = Vue.extend(Toast)

//   // 2. 通过组件构造器直接new一个组件
//   const toast = new toastConstructor()

//   // 3. 通过组件的$mount()方法将创建出来的组件挂载到一个元素上
//   toast.$mount( document.createElement("div") )

//   // 4. 因为第三步已经把组件挂载到div上，所以可以通过$el拿到刚才挂载的div
//   document.body.appendChild(toast.$el)

//   // 至此，就可以将toast绑定在DOM上了

//   // 5. 在vue的原型上加上$toast，后续可以通过$toast调用toast组件中的方法，对toast进行控制
//   Vue.prototype.$toast = toast 

// }

// export default obj


import Toast from './Toast.vue'
const obj = {}

obj.install = (Vue) => {
  const toastConstructor = Vue.extend(Toast)
  const toast = new toastConstructor()
  toast.$mount(document.createElement('div'))
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}

export default obj