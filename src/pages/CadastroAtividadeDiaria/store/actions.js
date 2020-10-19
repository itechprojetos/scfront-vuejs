import { services, http } from "../../../http";

export const ActionGetList = function () {
    return services.atividadediaria.all().then(function (r) {
        return r.data;
    });
};

export const ActionUpdate = function (context, payload) {
    return services.atividadediaria.update({id: payload.id}, payload).then((r) => {
        return r.data;
    });
};

export const ActionCreate = function (context, payload) {
    return services.atividadediaria.create(payload).then(function (r) {
        return r.data;
    });
};


export const ActionDelete = (context, payload) => {
    return services.atividadediaria.delete(payload).then(r => {
        return r.data;
    });
};