import { Sizes } from '../enums';
import Product from './product';

interface Item {
  product?: string | Product;
  color?: string;
  size?: Sizes;
  quantity?: number;
}

export default Item;
