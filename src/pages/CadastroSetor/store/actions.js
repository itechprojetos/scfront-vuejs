import { services, http } from "../../../http";

export const ActionGetList = function () {
    return services.setor.all().then(function (r) {
        return r.data;
    });
};

export const ActionUpdate = function (context, payload) {
    return services.setor.update({id: payload.id}, payload).then((r) => {
        return r.data;
    });
};

export const ActionCreate = function (context, payload) {
    return services.setor.create(payload).then(function (r) {
        return r.data;
    });
};


export const ActionDelete = (context, payload) => {
    return services.setor.delete(payload).then(r => {
        return r.data;
    });
};