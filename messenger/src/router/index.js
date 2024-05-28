import { createWebHistory, createRouter } from 'vue-router'  

import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue"
import RegisterView from "../views/RegisterView.vue"
import { useUserStore } from '../stores/userStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'main',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
});

router.beforeEach(async (to, from) => {

  const { user } = useUserStore();

  if (
    !user &&
    to.name !== 'login' &&
    to.name !== 'register'
  ) {
    return { name: 'login' }
  }
});

export default router;