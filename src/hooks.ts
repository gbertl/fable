import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useEffect, useState } from 'react';
import { selectItems } from './store/slices/cart';
import axios from './axios';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGetCartTotal = () => {
  const cartItems = useAppSelector(selectItems);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    (async () => {
      let total = 0;

      for (const item of cartItems) {
        const { data: product } = await axios.get(
          `/products/${item.productId}`
        );

        total += Math.round(product.price * (item.quantity || 0));
      }

      setCartTotal(total);
    })();
  }, [cartItems]);

  return cartTotal;
};
