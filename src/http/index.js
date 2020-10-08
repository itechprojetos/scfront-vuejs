import Vue from "vue";
import VueResource from "vue-resource";
import services from "./services";
import interceptors from "./interceptors";

Vue.use(VueResource);

const http = Vue.http;
http.options.root = "http://apisc-itechagencia-tech.umbler.net";
//http.options.root = "http://127.0.0.1:8080";
http.interceptors.push(interceptors);
http.headers.common['Access-Control-Allow-Origin'] = '*';

Object.keys(services).map(function (s) {
    services[s] = Vue.resource('', {}, services[s]);
});

const setBearerToken = function (token) {
    http.headers.common['Authorization'] = `Bearer ${token}`;
};
export default services;
export { http, setBearerToken, services };

