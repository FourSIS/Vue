import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../components/Home.vue'             //正常导入
// import About from '../components/About.vue'
// import User from '../components/User.vue'



const Home = () => import('../components/Home.vue')   //懒加载写法，只有当Home在被调用（路由要跳转/home）的时候，才会去import Home.vue
const HomeNews = () => import('../components/HomeNews.vue')
const About = () => import('../components/About.vue')
const User = () => import('../components/User.vue')
const HomeMessages = () => import('../components/HomeMessage.vue')
const Profile = () => import('../components/Profile.vue')


Vue.use(VueRouter)      // 调用插件之前需要先use一下，use实际上就是调用插件内部的install方法


const routes = [
  {
    path: '',
    redirect: '/home'       // redirect重定向
  },
  {
    path: '/home',
    component: Home,        // component是引入的vue组件
    meta: {
      title: '首页'         //设置当前路由的标题，最后赋值给document.title
    },
    children: [
      // {                    //这里的默认路由写到了Home组件内部，用actived回调进行push
      //   path: '/home',
      //   redirect: 'news'
      // },
      {
        path: 'news',
        component: HomeNews,
        meta: {
          title: '新闻'
        }
      },
      {
        path: 'messages',
        component: HomeMessages,
        meta: {
          title: '消息'
        }
      }
    ]
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: '关于'
    }
  },
  {
    path: '/user/:userId',  //通过：绑定之后，可以在$route.params.XXX中拿到（其中XXX是这里的对象名）
    component: User,
    meta: {
      title: '用户'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '档案'
    }
  }
]


const router = new VueRouter({
  routes,                        //添加路由信息
  mode: "history",               //调整模式为history模式
  linkActiveClass: 'active'      //集体调整activeClass
})

router.beforeEach( (to, from, next) => {
  document.title = to.matched[0].meta.title
  next()
})

// router.afterEach( (to, from) => {
//   console.log('全局后置回调');
// })



export default router