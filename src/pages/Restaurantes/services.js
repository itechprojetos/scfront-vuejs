export default {
  create: { method: 'POST', url: 'restaurantes' },
  all: { method: 'GET', url: 'restaurantes' },
  delete: {method: 'DELETE', url: 'restaurantes/{id}'},
  update: {method: 'PUT', url: 'restaurantes/{id}'}
};