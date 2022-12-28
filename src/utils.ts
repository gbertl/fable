import { Item } from './types';
import axios from './axios';

export const findCartItem = (cartItems: Item[], itemData: Item) =>
  cartItems.find(
    (ci) =>
      ci.productId === itemData.productId &&
      ci.color === itemData.color &&
      ci.size === itemData.size
  );

export const stringToHypen = (str: string) =>
  str.toLowerCase().split(' ').join('-');

export const applyToken = (token: string) =>
  (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`);
