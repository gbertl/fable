import { products } from './data';
import { Item } from './typings';

export const findCartItem = (cartItems: Item[], itemData: Item) =>
  cartItems.find(
    (ci) =>
      ci.productId === itemData.productId &&
      ci.colorId === itemData.colorId &&
      ci.size === itemData.size
  );

export const stringToHash = (str: string) =>
  `/#${str.toLowerCase().split(' ').join('-')}-section`;

export const getCartTotal = (cartItems: Item[]) =>
  cartItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);

    if (product && item.quantity) {
      return sum + Math.round(product.price * item.quantity);
    } else {
      return 0;
    }
  }, 0);
