import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://scarlet-codfish-robe.cyclic.app/'
    : 'http://localhost:5000/';

const instance = axios.create({
  baseURL,
});

export default instance;
