import { RouteRecordRaw } from "vue-router";
import ProfHome from "../views/ProfHome.vue";
import Contents from "../views/ShowContents.vue";
import OneContent from "../views/OneContent.vue";
import EditModules from "../views/Portugues/modulos/EditModulePortuguese.vue";
 
const userRoutes: Array<RouteRecordRaw> = [
  {
    path: "/professor",
    name: "Home Professor",
    component: ProfHome,
  },
  {
    path: "/portugues/contents/",
    name: "contents",
    component: Contents,
  },
  {
    path: "/portugues/edit/contents/:id",
    name: "EditModules",
    component: EditModules,
    props: true,
  },
  {
    path: "/content",
    name: "onecontents",
    component: OneContent,
    props: route => ({ data: route.query.data }) // Passar dados como props
  },
];

export default userRoutes;