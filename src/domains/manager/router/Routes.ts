import { RouteRecordRaw } from "vue-router";

import ShowCategories from "../views/categories/ShowCategory.vue";
import ShowModules from "@/domains/manager/views/modules/ShowModules.vue"
import ShowContents from "../views/contents/ShowContents.vue";
import ShowOneContent from "../views/contents/ShowOneContent.vue";


const userRoutes: Array<RouteRecordRaw> = [
  // CATEGORIES ROUTES
  {
    path: "/manager/categories",
    name: "exibir categorias para editar",
    component: ShowCategories,
  },
  // MODULES ROUTES
  {
    path: "/manager/modules",
    name: "exibir modulos para editar",
    component: ShowModules,
  },

  // CONTENTS ROUTES
  {
    path: "/manager/contents",
    name: "exibir conteudos para editar",
    component: ShowContents,
  },
  {
    path: "/manager/contents/:id", 
    name: "exibir um conteudo apenas para editar",
    component: ShowOneContent,
  }
];

export default userRoutes;
