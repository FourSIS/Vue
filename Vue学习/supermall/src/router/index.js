import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Shopcard = () => import('views/shopcard/Shopcard')
const Profile = () => import('views/profile/Profile')
const Details = () => import('views/details/Details')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcard',
    component: Shopcard
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/details',
    component: Details
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router