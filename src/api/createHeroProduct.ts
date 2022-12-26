import { applyToken } from '../utils';
import { NewHeroProduct } from '../typings.d';
import axios from '../axios';

const createHeroProduct = (values: NewHeroProduct, token: string) => {
  applyToken(token);

  return axios.post('/hero-products', values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default createHeroProduct;
