import axios from "axios";

const API_URL = "/api/transaction";
//requisição de períodos específico mapeando todas as transaction e com description
//e retornando os dados ordenados de forma crescente
const getAll = async (period) => {
  const res = await axios.get(`${API_URL}?period=${period}`);

  const data = res.data.map((transaction) => {
    const { category } = transaction;
    return {
      ...transaction,
      categoryLower: category.toLowerCase(),
    };
  });

  return data.sort((a, b) => a.day - b.day);
};

//requisição de todos períodos
const getAllPeriods = async () => {
  const res = await axios.get(`${API_URL}/periods`);

  return res.data;
};

const insert = async (lancament) => {
  const res = await axios.post(API_URL, lancament);

  return res.data;
};

const remove = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);

  return res.data;
};

const update = async (lancament) => {
  const res = await axios.put(API_URL, lancament);

  return res.data;
};

export { getAll, getAllPeriods, insert, remove, update };
