import { RouteRecordRaw } from 'vue-router';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import UsersAll from '../views/UsersAll.vue';
const authRoutes: Array<RouteRecordRaw> = [

    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/all', component: UsersAll }
]

export default authRoutes;