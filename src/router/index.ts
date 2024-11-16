import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ResourceManagement',
      component: () =>
        import('../views/ResourceManagement/ResourceManagement.vue')
    }
  ]
})

export default router
