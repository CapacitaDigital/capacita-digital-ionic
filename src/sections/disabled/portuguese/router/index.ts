import { RouteRecordRaw } from 'vue-router';
import CacaPalavras from '../views/CacaPalavras.vue';
import Silabario from '../views/Silabario.vue';
import EscritaPort from '../views/Escrita.vue';

const portugueseRoutes: Array<RouteRecordRaw> = [

    { path: '/att/pt/escrita', component: EscritaPort },
    { path: '/att/pt/cacapalavras', component: CacaPalavras },
    { path: '/att/pt/silabario', component: Silabario }
]

export default portugueseRoutes;