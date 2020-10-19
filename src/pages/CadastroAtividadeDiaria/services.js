export default {
  create: { method: 'POST', url: 'atividadesdiarias' },
  all: { method: 'GET', url: 'atividadesdiarias' },
  delete: {method: 'DELETE', url: 'atividadesdiarias/{id}'},
  update: {method: 'PUT', url: 'atividadesdiarias/{id}'}
};