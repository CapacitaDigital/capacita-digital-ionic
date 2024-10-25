// Imports default

import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Welcome from "@/domains/user/views/Welcome.vue";
import Login from "../domains/auth/views/Login.vue";
import Person from "@/domains/auth/views/Person.vue";

// Routes of domains

import authRoutes from "@/domains/auth/router/auth";
import managerRoutes from "@/domains/manager/router/Routes";
import userRoutes from "@/domains/user/router/userRoutes";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/person",
    name: "Person",
    component: Person,
  },

  // Routes of domains

  ...authRoutes, //routes of auth
  ...managerRoutes, //routes of manager
  ...userRoutes, //routes of user
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
