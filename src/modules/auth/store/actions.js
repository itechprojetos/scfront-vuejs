import { services } from "../../../http";
import * as storage from "../storage";
import * as types from "./mutation-types";


export const ActionSetHeaderToken = function ({ dispatch }, payload) {
    const token = storage.getLocalToken();
    dispatch("ActionSetToken", token);
    return Promise.resolve(token);
};

export const ActionDoLogin = function ({ dispatch }, payload) {
    return services.auth.login(payload).then(r => {
        dispatch("ActionSetUser", r.data.user);
        dispatch("ActionSetToken", r.data.user.accessToken);
        dispatch("ActionSetRoles", r.data.roles);
    });
};
export const ActionCheckToken = function ({ dispatch, state }) {
    const token = storage.getLocalToken();
    if (state.token) {
        return Promise.resolve(state.token);
    } else
        if (!token) {
            return Promise.reject(new Error("Token Inválido"));
        } else {
            dispatch("ActionSetToken", token);
            dispatch("ActionSetUser", storage.getLocalUsuario());
            dispatch("ActionSetRoles", storage.getLocalRoles());
            return Promise.resolve(token);
        }
}

export const ActionSetUser = function ({ commit }, payload) {
    storage.setLocalUsuario(payload);
    commit(types.SET_USER, payload);
};

export const ActionSetToken = function ({ commit }, payload) {
    storage.setLocalToken(payload);
    storage.setHeaderToken(payload);
    commit(types.SET_TOKEN, payload);
};

export const ActionSetRoles = function ({commit}, payload) {
    storage.setLocalRoles(payload);
    commit(types.SET_ROLES, payload);
;}

export const ActionSingnout = function ({ dispatch }) {
    storage.setHeaderToken("");
    storage.deleteLocalToken();
    storage.deleteLocalUsuario();
    dispatch("ActionSetUser", null);
    dispatch("ActionSetToken", "");

};

