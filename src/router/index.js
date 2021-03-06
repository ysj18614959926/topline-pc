import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
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
      },
      {
        name: 'editArtital',
        path: '/publish/:id',
        component: () => import('@/views/publish')
      },
      {
        name: 'articals',
        path: '/articals',
        component: () => import('@/views/articals')
      },
      {
        name: 'comment',
        path: '/comment',
        component: () => import('@/views/comment')
      },
      {
        name: 'user',
        path: '/user',
        component: () => import('@/views/user')
      },
      {
        name: 'media',
        path: '/media',
        component: () => import('@/views/media')
      }
    ]
  }, {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
  }]
})
router.beforeEach((to, from, next) => {
  nprogress.start()
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
router.afterEach(() => {
  nprogress.done()
})
export default router
