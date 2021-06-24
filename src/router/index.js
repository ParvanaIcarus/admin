import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Login = () => import('views/login/Login')
const Welcome = () => import('views/home/welcome/Welcome')
const Users = () => import('views/home/users/Users')
const Roles = () => import('views/home/roles/Roles')
const Rights = () => import('views/home/rights/Rights')
const Reports = () => import('views/home/reports/Reports')
const Params = () => import('views/home/params/Params')
const Orders = () => import('views/home/orders/Orders')
const Goods = () => import('views/home/goods/Goods')
const Categories = () => import('views/home/categories/Categories')

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    redirect: 'welcome',
    component: Home,
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome,
      },
      {
        path: '/users',
        name: 'Users',
        component: Users,
      },
      {
        path: '/roles',
        name: 'Roles',
        component: Roles,
      },
      {
        path: '/rights',
        name: 'Rights',
        component: Rights,
      },
      {
        path: '/reports',
        name: 'Reports',
        component: Reports,
      },
      {
        path: '/params',
        name: 'Params',
        component: Params,
      },
      {
        path: '/orders',
        name: 'Orders',
        component: Orders,
      },
      {
        path: '/goods',
        name: 'Goods',
        component: Goods,
      },
      {
        path: '/categories',
        name: 'Categories',
        component: Categories,
      },
    ],
  },
  {
    path: '/login',
    name: Login,
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path != '/login') {
    if (!sessionStorage.getItem('token')) {
      next('/login')
    } else {
      next()
    }
  }
  next()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router
