import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/AfspraakMaken',
      name: 'AfspraakMaken',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AfspraakMaken.vue'),
    },
    {
      path: '/admin/AdminAfspraken',
      name: 'AdminAfspraken',
      component: () => import('../views/admin/AdminAfspraken.vue'),
      // meta: { requiresAdmin: true }, // 👈 belangrijk
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  if (to.meta.requiresAdmin && !isAdmin) {
    next('/') // of naar login pagina
  } else {
    next()
  }
})

export default router
