export default {
    create: { method: 'POST', url: 'users' },
    all: { method: 'GET', url: 'users' },
    delete: {method: 'DELETE', url: 'user/{id}'},
    update: {method: 'PUT', url: 'user/{id}'}
};