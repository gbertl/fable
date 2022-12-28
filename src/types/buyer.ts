import Order from './order';

interface Buyer {
  name: string;
  phone: number;
  email: string;
  city: string;
  address: string;
  orders: Order[];
}

export default Buyer;
