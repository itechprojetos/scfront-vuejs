import { services, http } from "../../../http";

export const ActionGetCurrentHour = function () {
  return services.home.getCurrentHour().then(function (r) {
    return r.data;
  });
};

export const ActionToClockIn = function (context, payload) {
  return services.home.register(payload).then(function (r) {
      return r.data;
  });
};