import { services, http } from "../../../http";

export const ActionToClockIn = function (context, payload) {
  return services.home.register(payload).then(function (r) {
      return r.data;
  });
};