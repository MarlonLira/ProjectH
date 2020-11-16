import axios from 'axios';

const api = axios.create({
  baseURL:'https://re-significa.herokuapp.com/'
});

export default api;