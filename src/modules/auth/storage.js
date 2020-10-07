import { setBearerToken } from "../../http";

// TOKEN
export const setHeaderToken = function (token) {
    setBearerToken(token)
};
export const getLocalToken = function () {
    return localStorage.getItem('token');
};
export const deleteLocalToken = function () {
    localStorage.removeItem('token');
};
export const setLocalToken = function (token) {
    localStorage.setItem('token', token);
};


// USER
export const getLocalUsuario = function () {
    return JSON.parse(localStorage.getItem('usuario'));
};
export const deleteLocalUsuario = function () {
    localStorage.removeItem('usuario');
};
export const setLocalUsuario = function (usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
};

//ROLES

export const setLocalRoles = permissoes => {
    localStorage.setItem('permissoes', JSON.stringify(permissoes))
}
export const getLocalRoles = () => {
    return JSON.parse(localStorage.getItem('permissoes'));
};

export const deleteLocalRoles = function () {
    localStorage.removeItem('permissoes');
};



// export const setLocalEmpresa = empresa => localStorage.setItem('empresa', JSON.stringify(empresa));
// export const getLocalEmpresa = () => JSON.parse(localStorage.getItem('empresa'));