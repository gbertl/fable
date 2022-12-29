import { DeliveryMethods, PaymentMethods } from '../enums';
import Buyer from './buyer';
import Item from './item';

interface Order extends Item {
  buyer: string | Buyer;
  deliveryMethod: DeliveryMethods;
  paymentMethod: PaymentMethods;
}

export default Order;
