import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/auth/LoginForm.vue'),
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/auth/RegisterForm.vue'),
    meta: { guest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tasks/new',
    name: 'NewTask',
    component: () => import('../components/tasks/TaskForm.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tasks/:id/edit',
    name: 'EditTask',
    component: () => import('../components/tasks/TaskForm.vue'),
    meta: { requiresAuth: true }
  },
  // Catch all route for non-existing paths
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Check token validity if exists
  if (authStore.token) {
    await authStore.checkToken()
  }

  const isAuthenticated = authStore.isAuthenticated

  // If route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }

  // If route is for guests only (login, register) and user is authenticated
  if (to.meta.guest && isAuthenticated) {
    next('/dashboard')
    return
  }

  // In all other cases, allow navigation
  next()
})

export default router 