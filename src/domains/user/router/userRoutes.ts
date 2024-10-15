import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/Home.vue';
import PerfilPage from '../views/Perfil.vue';
import Modulo from '../views/Modulo.vue';
import RoadMap from '../views/RoadMap.vue';
import CreateCategory from '../views/CategoriaCreate.vue';
import EditCategory from '../views/CategoriaEdit.vue';

const userRoutes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'Home',
        component: HomePage
    },
    {   
        path: '/categoria/create',
        name: 'CreateCategory',
        component: CreateCategory
    },
    {   
        path: '/categoria/edit:id/:name/:description/:status/:userId',
        name: 'EditCategory',
        component: EditCategory,
    },
    {
        path: '/perfil',
        name: 'Perfil',
        component: PerfilPage
    },
    {
        path: '/att/modulo',
        name: 'Modulo de atividade',
        component: Modulo
    },
    {
      path: '/att/roadmap',
      name: 'RoadMap',
      component: RoadMap
    }
];

export default userRoutes;