import { services, http } from "../../../http";

export const ActionGetList = function () {
    return services.restaurante.all().then(function (r) {
        return r.data;
    });
};

export const ActionUpdate = function (context, payload) {
    return services.restaurante.update({id: payload.id}, payload).then((r) => {
        return r.data;
    });
};

export const ActionCreate = function (context, payload) {
    return services.restaurante.create(payload).then(function (r) {
        return r.data;
    });
};


export const ActionDelete = (context, payload) => {
    return services.restaurante.delete(payload).then(r => {
        return r.data;
    });
};