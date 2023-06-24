import { useEffect, useState } from 'react';

import { selectItems } from '../store/slices/cart';
import { useAppSelector } from '.';

const useGetCartTotal = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const cartItems = useAppSelector(selectItems);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 0);
    }, 0);

    setCartTotal(total);
  }, [cartItems]);

  return cartTotal;
};

export default useGetCartTotal;
