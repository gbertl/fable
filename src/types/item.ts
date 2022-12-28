import { Sizes } from '../enums';

interface Item {
  productId?: string;
  color?: string;
  size?: Sizes;
  quantity?: number;
}

export default Item;
