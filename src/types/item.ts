import { Sizes } from '../enums';

interface Item {
  productId?: string;
  colorId?: number;
  size?: Sizes;
  quantity?: number;
}

export default Item;
