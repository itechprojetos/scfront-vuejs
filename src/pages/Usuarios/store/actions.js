import { services, http } from "../../../http";

export const ActionGetList = function () {
    return services.usuario.all().then(function (r) {
        return r.data;
    });
};

export const ActionUpdate = function (context, payload) {
    return services.usuario.update({id: payload.id}, payload).then((r) => {
        return r.data;
    });
};

export const ActionCreate = function (context, payload) {
    return services.usuario.create(payload).then(function (r) {
        return r.data;
    });
};


export const ActionDelete = (context, payload) => {
    return services.usuario.delete(payload).then(r => {
        return r.data;
    });
};