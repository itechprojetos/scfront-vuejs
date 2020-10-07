import Vue from 'vue'
import VueRouter from 'vue-router'
import { getLocalUsuario } from "../modules/auth/storage";
import routes from "./routes";
import store from "../store";
Vue.use(VueRouter)

const router = new VueRouter({ routes });

router.beforeEach(async (to, from, next) => {
    document.title = `StringCleasing | ${to.name}`;
    let isLogged = getLocalUsuario();

    if (isLogged != undefined || isLogged != null) {
        await store.dispatch('auth/ActionCheckToken');
    }


    if (to.fullPath === "/login" && (isLogged != undefined || isLogged != null)) {

        next("/");
    } else if (to.fullPath === "/login" && (isLogged == undefined || isLogged == null)) {
        next(true);

    } else if (to.fullPath !== "/login" && (isLogged == undefined || isLogged == null)) {
        next('/login');
    } else {
        next(true);
    }
});

export default router;
