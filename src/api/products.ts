import { applyToken } from '../utils';
import axios from '../axios';
import { NewProduct, Product, UpdateProduct } from '../types';
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

export const getProduct = (id: string) =>
  axios.get(generatePath(apiRoutes.productDetail, { id }));

export const getProducts = (ids?: string[]) => {
  let idsQuery = '';
  // where[0][_id][0]=randomstring

  if (ids) {
    ids.forEach((id, idx) => {
      idsQuery +=
        idx === 0
          ? `?where[0][_id][${idx}]=${id}`
          : `&where[0][_id][${idx}]=${id}`;
    });
  }

  return axios.get<Product[]>(`${apiRoutes.productList}${idsQuery}`);
};
