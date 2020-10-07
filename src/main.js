import App from "./App";

import Vue from "vue";
import VueGoodTable from "vue-good-table";
import Simplert from "vue2-simplert";
import VueTheMask from "vue-the-mask";
import JsonExcel from "vue-json-excel";
import vSelect from "vue-select";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueHtmlToPaper from 'vue-html-to-paper';
import VueRecaptcha from 'vue-recaptcha';

import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}

Vue.use(VueSweetalert2);
Vue.use(require('vue-moment'));
Vue.use(VueRecaptcha);
// site key = 6LcSqc8ZAAAAACbi5tBzFW_VRoqY_D5yyUOZZQXB
//token = 6LcSqc8ZAAAAAJFhNS9y9eugLnSuf8dU672_6wYb


Vue.config.productionTip = false

library.add(faUserSecret);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueGoodTable);
Vue.use(Simplert);
Vue.use(VueTheMask);
Vue.use(VueHtmlToPaper, options);
Vue.component("v-select", vSelect);
Vue.component("downloadExcel", JsonExcel);

Vue.prototype.$scrollTop = function () {
  var element = document.getElementById("app");
  var top = element.offsetTop;
  window.scrollTo(0, top);
}

window._Vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')