import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const getUser = window.localStorage.getItem('userLogin')
const router = new Router({
  routes: [{
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('@/views/home')
      },
      {
        name: 'publish',
        path: '/publish',
        component: () => import('@/views/publish')
      }
    ]
  }, {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
  }]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    if (getUser) {
      next('/')
    } else {
      next()
    }
  } else {
    if (getUser) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
