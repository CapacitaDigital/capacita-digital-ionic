// Imports default

import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Welcome from "user/views/Welcome.vue";
import Login from "auth/views/Login.vue";
import Person from "auth/views/Person.vue";

// Routes of domains

import authRoutes from "auth/router/index";
import managerRoutes from "manager/router/index";
import userRoutes from "user/router/index";

const routes: Array<RouteRecordRaw> = [
  
  { path: "/", component: Welcome },
  { path: "/login", component: Login },
  { path: "/person", component: Person },

  // Routes of domains

  ...authRoutes, 
  ...managerRoutes, 
  ...userRoutes, 
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
