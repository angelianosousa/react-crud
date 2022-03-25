import http from '../http-common';

const create = data => {
  return http.post('/products', data);
}

const read = id => {
  return http.get('/products', id);
}

const update = id => {
  return http.put(`/products${id}`)
}

const remove = id => {
  return http.delete(`/products${id}`)
}

export default {
  create,
  read,
  update,
  remove
}