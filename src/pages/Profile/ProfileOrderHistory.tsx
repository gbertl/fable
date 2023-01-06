import { useEffect, useState } from 'react';
import { generatePath } from 'react-router-dom';

import { useGetBuyer } from '../../hooks';
import { apiRoutes } from '../../routes';
import { Order } from '../../types';
import axios from '../../axios';
import ProfileOrdersTable from './ProfileOrdersTable';

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
          if (typeof buyerOrder === 'object') {
            const { data } = await axios.get(
              generatePath(apiRoutes.productDetail, {
                id: buyerOrder.product,
              })
            );
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
