import { applyToken } from '../utils';
import axios from '../axios';
import { UpdateProduct } from '../types';

const updateProduct = (id: string, values: UpdateProduct, token: string) => {
  applyToken(token);

  return axios.put(`/products/${id}`, values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default updateProduct;
