import { applyToken } from '../utils';
import { NewHeroProduct, UpdateHeroProduct } from '../types';
import axios from '../axios';
import { apiRoutes } from '../routes';
import { generatePath } from 'react-router-dom';

export const createHeroProduct = (values: NewHeroProduct, token: string) => {
  applyToken(token);

  return axios.post(apiRoutes.heroProductList, values, {
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

  return axios.put(
    generatePath(apiRoutes.heroProductDetail, {
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
