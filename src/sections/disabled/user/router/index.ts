import { RouteRecordRaw } from "vue-router";

import ShowPerfil from "../views/perfil/ShowPerfil.vue";

import ShowCategories from "../views/categories/ShowCategories.vue";
import ShowOneCategory from "manager/views/categories/ShowOneCategory.vue";

import ShowModules from "../views/modules/ShowModules.vue";
import ShowOneModule from "manager/views/modules/ShowOneModule.vue";

import ShowContents from "user/views/contents/ShowContents.vue";
import ShowOneContent from "user/views/contents/ShowOneContent.vue";

const userRoutes: Array<RouteRecordRaw> = [
  
  // --------- USER ROUTES --------- //
  { path: "/perfil", component: ShowPerfil },

  // --------- CATEGORIES ROUTES --------- //
  { path: "/user/categories", component: ShowCategories },
  { path: "/user/categories/:id", component: ShowOneCategory },

  // --------- MODULES ROUTES --------- //
  { path: "/user/modules", component: ShowModules },
  { path: "/user/modules/:id", component: ShowOneModule },

  // --------- CONTENTS ROUTES --------- //
  { path: "/user/contents", component: ShowContents },
  { path: "/user/contents/:id", component: ShowOneContent },

];

export default userRoutes;
