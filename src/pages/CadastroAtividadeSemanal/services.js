export default {
  create: { method: 'POST', url: 'atividadessemanais' },
  all: { method: 'GET', url: 'atividadessemanais' },
  delete: {method: 'DELETE', url: 'atividadessemanais/{id}'},
  update: {method: 'PUT', url: 'atividadessemanais/{id}'}
};