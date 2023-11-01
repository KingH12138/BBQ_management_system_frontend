import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/UserLogin.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/UserRegister.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/UserHome.vue')
    }
  ]
})

export default router
