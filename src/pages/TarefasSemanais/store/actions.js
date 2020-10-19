import { services, http } from "../../../http";

export const ActionGetList = function () {
  return services.tarefassemanais.all().then(function (r) {
      return r.data;
  });
};

export const ActionRegister = function (context, payload) {
  return services.tarefassemanais.register(payload).then(function (r) {
      return r.data;
  });
};