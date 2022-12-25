import { NewHeroProduct, NewProduct, UpdateHeroProduct } from './typings.d';
import axios from './axios';

const applyToken = (token: string) =>
  (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`);

export const createProduct = (values: NewProduct, token: string) => {
  applyToken(token);

  return axios.post('/products', values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const createHeroProduct = (values: NewHeroProduct, token: string) => {
  applyToken(token);

  return axios.post('/hero-products', values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateHeroProduct = (
  id: string,
  values: UpdateHeroProduct,
  token: string
) => {
  applyToken(token);

  return axios.put(`/hero-products/${id}`, values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
