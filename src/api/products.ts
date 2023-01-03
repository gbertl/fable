import { applyToken } from '../utils';
import axios from '../axios';
import { NewProduct, UpdateProduct } from '../types';
import { apiRoutes } from '../routes';
import { generatePath } from 'react-router-dom';

export const createProduct = (values: NewProduct, token: string) => {
  applyToken(token);

  return axios.post(apiRoutes.productList, values, {
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

  return axios.put(
    generatePath(apiRoutes.productDetail, {
      id,
    }),
    values,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
