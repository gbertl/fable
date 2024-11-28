import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH0_AUDIENCE}/`,
});

export default instance;
