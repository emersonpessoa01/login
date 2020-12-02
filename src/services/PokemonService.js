import http from '../http-common';

const getAll = () => {
  return http.get('/pokemon');
};

const get = (id) => {
  return http.get(`/pokemon/${id}`);
};

const create = (data) => {
  return http.post('/pokemon', data);
};

const update = (id, data) => {
  return http.put(`/pokemon/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/pokemon/${id}`);
};

const removeAll = () => {
  return http.delete(`/pokemon`);
};

const findByName = (name) => {
  return http.get(`/pokemon?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};