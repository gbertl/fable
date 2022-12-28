import { DeliveryMethods, PaymentMethods } from '../enums';
import Buyer from './buyer';
import Product from './product';

interface Order {
  buyer: string | Buyer;
  product: string | Product;
  deliveryMethod: DeliveryMethods;
  paymentMethod: PaymentMethods;
}

export default Order;
