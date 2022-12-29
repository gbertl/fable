import { Sizes } from '../enums';

interface Item {
  product?: string;
  color?: string;
  size?: Sizes;
  quantity?: number;
}

export default Item;
