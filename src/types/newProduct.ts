import { Categories, Sizes } from '../enums';

interface NewProduct {
  imageFile?: File;
  name?: string;
  collectionName?: string;
  category?: Categories;
  size?: Sizes;
  color?: string;
  price?: number;
}

export default NewProduct;
