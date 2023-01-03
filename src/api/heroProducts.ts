import { applyToken } from '../utils';
import { NewHeroProduct, UpdateHeroProduct } from '../types';
import axios from '../axios';

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
