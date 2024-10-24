import { RouteRecordRaw } from "vue-router";

import ShowCategories from "../views/categories/ShowCategories.vue";
import ShowOneCategory from "../views/categories/ShowOneCategory.vue";
import ShowModules from "../views/modules/ShowModules.vue";
import ShowOneModule from "../views/modules/ShowOneModule.vue";
import EditModule from "@/domains/manager/views/modules/EditModule.vue"
import ShowContents from "../views/contents/ShowContents.vue";
import ShowOneContent from "../views/contents/ShowOneContent.vue";
import CreateContent from "@/domains/manager/views/contents/CreateContent.vue";

const userRoutes: Array<RouteRecordRaw> = [
  // CATEGORIES ROUTES
  {
    path: "/manager/categories",
    name: "exibir categorias para editar",
    component: ShowCategories,
  },
  {
    path: "/manager/categories/:id",
    name: "exibir categoria por id",
    component: ShowOneCategory,
  },

  // MODULES ROUTES
  {
    path: "/manager/modules",
    name: "exibir modulos ",
    component: ShowModules,
  },
  {
    path: "/manager/modules/:id",
    name: "exibir modulo por id",
    component: ShowOneModule,
  },
  {
    path: "/manager/modules/edit/:id",
    name: "exibir apenas um modulo para editar",
    component: EditModule,
  },

  // CONTENTS ROUTES
  {
    path: "/manager/contents",
    name: "exibir conteudos para editar",
    component: ShowContents,
  },
  {
    path: "/manager/contents/create", 
    name: "Tela de create para atividade",
    component: CreateContent,
  },
  {
    path: "/manager/contents/edit/:id", 
    name: "exibir um conteudo apenas para editar",
    component: ShowOneContent,
  }
];

export default userRoutes;
