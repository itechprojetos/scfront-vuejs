import { services, http } from "../../../http";

export const ActionGetList = function () {
    return services.atividadesemanal.all().then(function (r) {
        return r.data;
    });
};

export const ActionUpdate = function (context, payload) {
    return services.atividadesemanal.update({id: payload.id}, payload).then((r) => {
        return r.data;
    });
};

export const ActionCreate = function (context, payload) {
    return services.atividadesemanal.create(payload).then(function (r) {
        return r.data;
    });
};


export const ActionDelete = (context, payload) => {
    return services.atividadesemanal.delete(payload).then(r => {
        return r.data;
    });
};