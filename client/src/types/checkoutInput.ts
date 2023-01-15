import Buyer from './buyer';
import Order from './order';

interface CheckoutInput
  extends Omit<Buyer, 'orders'>,
    Omit<Order, 'buyer' | 'product'> {
  loyaltyCard: number;
  agree: boolean;
  orderComment: string;
}

export default CheckoutInput;
