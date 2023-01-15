import moment from 'moment';
import { Order, Product } from '../../types';

const ProfileOrdersTable = ({ orders }: { orders: Order[] }) => {
  return (
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
              <td>{moment(order?.createdAt).format('MMMM DD YYYY kk:mm')}</td>
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
  );
};

export default ProfileOrdersTable;
