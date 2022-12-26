import { Categories, Sizes } from '../enums';

interface UpdateProduct {
  imageFile?: File;
  name: string;
  collectionName: string;
  category: Categories;
  size: Sizes;
  color: string;
  price: number;
}

export default UpdateProduct;
