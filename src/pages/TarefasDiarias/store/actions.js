import { services, http } from "../../../http";

export const ActionRegister = function (context, payload) {
  return services.tarefasdiarias.register(payload).then(function (r) {
      return r.data;
  });
};
