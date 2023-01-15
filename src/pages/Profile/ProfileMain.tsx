import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { bonusCard } from '../../assets';
import { Order } from '../../types';
import { useGetBuyer } from '../../hooks';
import ProfileOrdersTable from './ProfileOrdersTable';
import * as api from '../../api';

const ProfileMain = () => {
  const { data: buyer } = useGetBuyer({
    id: localStorage.getItem('buyerId') || '',
    populate: ['orders'],
    limit: [{ orders: 5 }],
  });

  const [orders, setOrders] = useState<Order[]>();

  const [searchParams] = useSearchParams();

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

  useEffect(() => {
    if (searchParams.get('success') !== null) {
      localStorage.removeItem('formValues');
      localStorage.removeItem('cartItems');
    }
  }, []);

  return (
    <>
      <h2 className="capitalize mb-9">Hello, {buyer?.name || 'Guest'}!</h2>

      <div className="max-w-[335px] h-[242px] bg-gray2 mb-9">
        <img src={bonusCard} alt="" className="pt-5" />
        <div className="px-5 pt-4 pb-5">
          <ul className="flex flex-col gap-3">
            <li className="flex justify-between">
              <span>Bonus card</span> <span>250 points</span>
            </li>
            <li className="flex justify-between text-gray">
              <span>Cashback</span> <span>5%</span>
            </li>
          </ul>
        </div>
      </div>

      <h4 className="mb-8">Recent orders</h4>

      <ProfileOrdersTable orders={orders as Order[]} />
    </>
  );
};

export default ProfileMain;
