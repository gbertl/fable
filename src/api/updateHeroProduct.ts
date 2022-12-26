import { UpdateHeroProduct } from '../typings.d';
import { applyToken } from '../utils';
import axios from '../axios';

const updateHeroProduct = (
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

export default updateHeroProduct;
