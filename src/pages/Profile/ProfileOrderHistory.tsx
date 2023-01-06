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
    if (!buyer) return;

    (async () => {
      const ordersData: Order[] = [];
      if (buyer.orders?.length) {
        let productIds: string[] = [];

        buyer.orders.forEach((order) => {
          if (typeof order === 'object' && typeof order.product === 'string') {
            productIds.push(order.product);
          }
        });

        if (productIds.length) {
          const { data: products } = await api.getProducts(productIds);

          for (const buyerOrder of buyer.orders) {
            if (
              typeof buyerOrder === 'object' &&
              typeof buyerOrder.product === 'string'
            ) {
              buyerOrder.product = products.find(
                (p) => p._id === buyerOrder.product
              );
              ordersData.push(buyerOrder);
            }
          }
          setOrders(ordersData as Order[]);
        }
      }
    })();
  }, [buyer]);

  return (
    <>
      <h2>Your orders {orders?.length ? <>({orders.length})</> : null}</h2>
      <hr className="border-gray2 my-6" />

      <ProfileOrdersTable orders={orders as Order[]} />
    </>
  );
};

export default ProfileOrderHistory;
