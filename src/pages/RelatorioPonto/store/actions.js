import { services } from '../../../http';

export const ActionGetList = function () {
    return services.relatorioponto.all().then(function (r) {
        return r.data;
    });
};
