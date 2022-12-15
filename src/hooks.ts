import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import type { RootState, AppDispatch } from './store';
import { selectItems } from './store/slices/cart';
import axios from './axios';
import { Product } from './typings';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGetCartTotal = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const cartItems = useAppSelector(selectItems);

  const { data: products } = useQuery<Product[]>('products', async () => {
    const { data } = await axios.get('/products');
    return data;
  });

  useEffect(() => {
    const total = cartItems.reduce((sum, cartItem) => {
      const product = products?.find((p) => p.id === cartItem.productId);

      return sum + (product?.price || 0) * (cartItem.quantity || 0);
    }, 0);

    setCartTotal(total);
  }, [cartItems, products]);

  return cartTotal;
};
