import { createRouter, createWebHistory } from 'vue-router';
import { getAuthToken } from '../services/api';

const routes = [
  { path: '/', redirect: '/produtos' },
  { path: '/login', component: () => import('../views/Login.vue') },
  { path: '/register', component: () => import('../views/Register.vue') },
  { 
    path: '/produtos', 
    component: () => import('../views/Produtos.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/users', 
    component: () => import('../views/UserDashboard.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = !!getAuthToken();

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
