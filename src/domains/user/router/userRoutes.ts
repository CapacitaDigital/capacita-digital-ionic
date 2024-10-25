import { RouteRecordRaw } from "vue-router";

import ShowPerfil from "../views/perfil/ShowPerfil.vue";

import ShowCategories from "../views/categories/ShowCategories.vue";
import ShowOneCategory from "@/domains/manager/views/categories/ShowOneCategory.vue";

import ShowModules from "../views/modules/ShowModules.vue";
import ShowOneModule from "@/domains/manager/views/modules/ShowOneModule.vue";

import ShowContents from "@/domains/user/views/contents/ShowContents.vue";
import ShowOneContent from "@/domains/user/views/contents/ShowOneContent.vue";

const userRoutes: Array<RouteRecordRaw> = [
  {
    path: "/perfil",
    name: "tela de perfil",
    component: ShowPerfil,
  },
  {
    path: "/user/categories",
    name: " tela de categorias",
    component: ShowCategories,
  },

  {
    path: "/user/categories/:id",
    name: "tela de categoria especifica",
    component: ShowOneCategory,
  },
  {
    path: "/user/modules",
    name: "tela de modulos da categoria",
    component: ShowModules,
  },
  {
    path: "/user/modules/:id",
    name: "tela de modulo especifico",
    component: ShowOneModule,
  },
  {
    path: "/user/contents",
    name: "tela de atividades do modulo especifico",
    component: ShowContents,
  },
  {
    path: "/user/contents/:id",
    name: "tela de atividade especifica do modulo",
    component: ShowOneContent,
  },

];

export default userRoutes;
