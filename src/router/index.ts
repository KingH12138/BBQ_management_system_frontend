import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/",
      redirect:'/login'
    },
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
      path: '/home',
      component: () => import('../views/UserHome.vue')
    },{
      path:"/manage",
      name:"Manage",
      component:() => import("../views/Manage.vue")
    }
  ]
})

export default router
