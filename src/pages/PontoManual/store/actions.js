import { services } from '../../../http';

export const ActionGetList = function () {
    return services.pontoeletronico.all().then(function (r) {
        return r.data;
    });
};

export const ActionCreate = function (context, payload) {
    return services.pontoeletronico.create(payload).then(function (r) {
        return r.data;
    });
};
