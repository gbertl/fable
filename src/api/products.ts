import { applyToken } from '../utils';
import axios from '../axios';
import { NewProduct, UpdateProduct } from '../types';

export const createProduct = (values: NewProduct, token: string) => {
  applyToken(token);

  return axios.post('/products', values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateProduct = (
  id: string,
  values: UpdateProduct,
  token: string
) => {
  applyToken(token);

  return axios.put(`/products/${id}`, values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
