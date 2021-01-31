import axios from "axios";

const api = axios.create({
  baseURL: "https://login-teste2.herokuapp.com/",
});

export default api;
