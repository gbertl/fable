import { Categories, Sizes } from '../enums';

interface Product {
  _id: string;
  heroImageUrl?: string;
  imageUrl: string;
  name: string;
  collectionName: string;
  category: Categories;
  size: Sizes;
  color: string;
  price: number;
  createdAt: string;
}

export default Product;
