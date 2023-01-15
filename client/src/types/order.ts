import { DeliveryMethods, PaymentMethods } from '../enums';
import Buyer from './buyer';
import Item from './item';

type Statuses = 'pending' | 'paid';

interface Order extends Item {
  _id?: string;
  buyer: string | Buyer;
  deliveryMethod: DeliveryMethods;
  paymentMethod: PaymentMethods;
  status?: Statuses;
  createdAt?: string;
}

export default Order;
