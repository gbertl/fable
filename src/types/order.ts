import { DeliveryMethods, PaymentMethods } from '../enums';

interface Order {
  city: string;
  deliveryMethod: DeliveryMethods;
  address: string;
  loyaltyCard: number;
  name: string;
  phone: number;
  email: string;
  paymentMethod: PaymentMethods;
  orderComment: string;
  agree: boolean;
}

export default Order;
