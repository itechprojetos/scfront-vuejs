import { services, http } from "../../../http";
// import * as types from "./mutation-types";

export const ActionGetListPermissao = function () {
    return http.get("permissions").then(function (r) {
        return r.data;
    });
};


export const ActionGetListPerfil = function () {
    return http.get("profiles").then(function (r) {
        return r.data;
    });
};


// export const ActionUpdate = function (context, payload) {


//     return http.put(`users`, payload).then((r) => {
//         return r.data;
//     });
// };

export const ActionCreate = function (context, payload) {
    return http.post("profiles", payload).then(function (r) {
        return r.data;
    });
};


export const ActionUpdate = function (context, payload) {
    return http.put("profiles", payload).then(function (r) {
        return r.data;
    });
};


export const ActionDelete = (context, payload) => {
    return http.delete("profiles/" + payload.id).then(function (r) {
        return r.data;
    });
};