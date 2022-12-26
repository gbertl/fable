import { applyToken } from '../utils';
import axios from '../axios';
import { NewProduct } from '../types';

const createProduct = (values: NewProduct, token: string) => {
  applyToken(token);

  return axios.post('/products', values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default createProduct;
