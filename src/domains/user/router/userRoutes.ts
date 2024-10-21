import { RouteRecordRaw } from 'vue-router';
import UserHome from '../views/UserHome.vue';
import PerfilPage from '../views/Perfil.vue';
import RoadMap from '../views/ShowContents.vue';
import UserModules from '@/domains/user/views/UserModules.vue';
import ShowContents from '@/domains/user/views/ShowContents.vue';
import OneContent from '@/domains/user/views/OneContent.vue';
const userRoutes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'Home',
        component: UserHome
    },
    {
        path: '/perfil',
        name: 'Perfil',
        component: PerfilPage
    },
    {
        path: '/user/modules',
        name: 'Modulos de atividade',
        component: UserModules
    },
    {
        path: '/user/contents',
        name: 'mostra atividades do modulo',
        component: ShowContents
    },
    {
        path: '/user/contents/:id',
        name: 'acessa a atividade especifica do modulo',
        component: OneContent
    },
    {
      path: '/att/roadmap',
      name: 'RoadMap',
      component: RoadMap
    }
];

export default userRoutes;