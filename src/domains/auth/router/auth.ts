import { RouteRecordRaw } from 'vue-router';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import UsersAll from '../views/UsersAll.vue';
const authRoutes: Array<RouteRecordRaw> = [
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/all',
        name: 'UserAll',
        component: UsersAll
    }
]

export default authRoutes;