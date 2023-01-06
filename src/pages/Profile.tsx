import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment';

import { Container } from '../components';
import { bonusCard } from '../assets';
import { generatePath, Link, useSearchParams } from 'react-router-dom';
import { useGetBuyer } from '../hooks';
import { useEffect, useState } from 'react';
import { Order, Product } from '../types';
import axios from '../axios';
import { apiRoutes, appRoutes } from '../routes';

const Profile = () => {
  const { isAuthenticated, logout, user } = useAuth0();
  const { data: buyer } = useGetBuyer(localStorage.getItem('buyerId') || '', [
    'orders',
  ]);

  const [orders, setOrders] = useState<Order[]>();

  const [searchParams] = useSearchParams();

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

  useEffect(() => {
    if (searchParams.get('success') !== null) {
      localStorage.removeItem('formValues');
      localStorage.removeItem('cartItems');
    }
  }, []);

  return (
    <Container className="flex flex-col lg:flex-row gap-14 mt-20 mb-10 w-full">
      <div className="min-w-[200px]">
        <ul className="flex lg:flex-col gap-6 flex-wrap">
          <li>
            <a href="#" className="text-dark">
              Main
            </a>
          </li>
          <li>
            <a href="#" className="text-gray hover:text-dark">
              Information
            </a>
          </li>
          <li>
            <a href="#" className="text-gray hover:text-dark">
              Order history
            </a>
          </li>
          <li>
            {isAuthenticated ? (
              <button
                onClick={() => logout()}
                className="text-gray hover:text-dark"
              >
                Logout
              </button>
            ) : (
              <Link to={appRoutes.login} className="text-gray hover:text-dark">
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div className="w-full">
        <h2 className="capitalize mb-9">
          Hello, {buyer?.name || user?.name || 'Guest'}!
        </h2>

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

        <div className="overflow-auto">
          <table className="profile__table w-full">
            <thead>
              <tr>
                <th>Number</th>
                <th>Order</th>
                <th>Date</th>
                <th>Summary</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{`${
                    (order.product as Product)?.name
                  } ${order.size?.toUpperCase()}`}</td>
                  <td>
                    {moment(orders?.[0].createdAt).format('MMMM DD YYYY kk:mm')}
                  </td>
                  <td>
                    ₱
                    {Math.floor(
                      (order.product as Product).price * (order.quantity || 0)
                    )}
                  </td>
                  <td className="text-green capitalize">{order.status}</td>
                </tr>
              ))}
              {!orders?.length && (
                <tr>
                  <td colSpan={5} className="text-center">
                    You have no orders.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
