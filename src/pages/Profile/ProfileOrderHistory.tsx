import { useEffect, useState } from 'react';

import { useGetBuyer } from '../../hooks';
import { Order } from '../../types';
import ProfileOrdersTable from './ProfileOrdersTable';
import * as api from '../../api';

const ProfileOrderHistory = () => {
  const { data: buyer } = useGetBuyer({
    id: localStorage.getItem('buyerId') || '',
    populate: ['orders'],
  });

  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    (async () => {
      const ordersData: Order[] = [];
      if (buyer?.orders?.length) {
        for (const buyerOrder of buyer.orders) {
          if (
            typeof buyerOrder === 'object' &&
            typeof buyerOrder.product === 'string'
          ) {
            const { data } = await api.getProduct(buyerOrder.product);
            buyerOrder.product = data;
            ordersData.push(buyerOrder);
          }
        }
        setOrders(ordersData as Order[]);
      }
    })();
  }, [buyer]);

  return (
    <>
      <h2>Your orders {orders && <>({orders.length})</>}</h2>
      <hr className="border-gray2 my-6" />

      <ProfileOrdersTable orders={orders as Order[]} />
    </>
  );
};

export default ProfileOrderHistory;
