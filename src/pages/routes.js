import Home from "../pages/Home/Home.vue";
import Usuarios from "./Usuarios/Usuarios.vue";
import Perfil from "./Perfil/Perfil.vue";
import Restaurantes from "./Restaurantes/Restaurantes.vue";


export default [
    {
        path: '/',
        name: 'Dashboard',
        component: Home
    },
    {
        path: '/perfil',
        name: 'Perfil',
        component: Perfil
    },
    {
        path: '/usuarios',
        name: 'Usuários',
        component: Usuarios
    },
    {
        path: '/restaurantes',
        name: 'Restaurantes',
        component: Restaurantes
    },
]
