import { Item } from './typings';

export const findCartItem = (cartItems: Item[], itemData: Item) =>
  cartItems.find(
    (ci) =>
      ci.productId === itemData.productId &&
      ci.colorId === itemData.colorId &&
      ci.size === itemData.size
  );

export const stringToHypen = (str: string) =>
  str.toLowerCase().split(' ').join('-');
