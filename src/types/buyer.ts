import Order from './order';

interface Buyer {
  _id?: string;
  name: string;
  phone: number;
  email: string;
  city: string;
  address: string;
  orders?: Order[] | string[];
}

export default Buyer;
