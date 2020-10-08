export default {
    create: { method: 'POST', url: 'api/users' },
    all: { method: 'GET', url: 'api/users' },
    delete: {method: 'DELETE', url: '/api/user/{id}'},
    update: {method: 'PUT', url: '/api/user/{id}'}
};