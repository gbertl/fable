import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { selectItems } from '../store/slices/cart';
import axios from '../axios';
import { Product } from '../types';
import { useAppSelector } from '.';
import { apiRoutes } from '../routes';

const useGetCartTotal = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const cartItems = useAppSelector(selectItems);

  const { data: products } = useQuery<Product[]>('products', async () => {
    const { data } = await axios.get(apiRoutes.productList);
    return data;
  });

  useEffect(() => {
    const total = cartItems.reduce((sum, cartItem) => {
      const product = products?.find((p) => p._id === cartItem.product);

      return sum + (product?.price || 0) * (cartItem.quantity || 0);
    }, 0);

    setCartTotal(total);
  }, [cartItems, products]);

  return cartTotal;
};

export default useGetCartTotal;
