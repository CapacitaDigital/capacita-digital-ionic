// Imports default

import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Welcome from '@/domains/user/views/Welcome.vue';
import Login from '../domains/auth/views/Login.vue';
import Person from '@/domains/auth/views/Person.vue';
import UsersAll from '@/domains/auth/views/UsersAll.vue';
import ManagerUsers from '@/domains/teacher/views/ManagerUsers.vue';
import Portugues from '@/domains/teacher/views/Portugues.vue';
import NewModule from '@/domains/teacher/views/modulos/NewModule.vue';
import EditModule from '@/domains/teacher/views/modulos/EditModule.vue';

// Routes of domains

import authRoutes from '@/domains/auth/router/auth';
import teacherRoutes from '@/domains/teacher/router/teacherRoutes';
import userRoutes from '@/domains/user/router/userRoutes';
import technologyRoutes from '@/domains/technology/router/technologyRoutes';
import portugueseRoutes from '@/domains/portuguese/router/portugueseRoutes';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/person',
    name: 'Person',
    component: Person
  },
  {
    path: '/users/all',
    name: 'Users',
    component: UsersAll
  },
  {
    path: "/manager/users",
    name: 'Manager Users',
    component: ManagerUsers
  },
  {
    path: "/manager/portugues/",
    name: 'Português',
    component: Portugues
  },
  {
    path: "/manager/portugues/module/new",
    name: 'New Module',
    component: NewModule
  },
  {
    path: "/module/edit",
    name: 'Edit Module',
    component: EditModule
  },

  // Routes of domains

  ...authRoutes,
  ...teacherRoutes,
  ...userRoutes,
  ...technologyRoutes,
  ...portugueseRoutes,

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
