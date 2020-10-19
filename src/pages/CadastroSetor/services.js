export default {
  create: { method: 'POST', url: 'setores' },
  all: { method: 'GET', url: 'setores' },
  delete: {method: 'DELETE', url: 'setores/{id}'},
  update: {method: 'PUT', url: 'setores/{id}'}
};