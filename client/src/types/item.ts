import { Sizes } from '../enums';
import { Product } from './products';

interface Item {
  product?: string | Product;
  color?: string;
  size?: Sizes;
  quantity?: number;
  price?: number;
}

export default Item;
