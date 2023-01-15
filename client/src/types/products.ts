import { Categories, Sizes } from '../enums';

export interface Product {
  _id: string;
  heroProduct: string;
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

export interface NewProduct {
  imageFile?: File;
  name?: string;
  collectionName?: string;
  category?: Categories;
  size?: Sizes;
  color?: string;
  price?: number;
}

export interface UpdateProduct {
  imageFile?: File;
  name: string;
  collectionName: string;
  category: Categories;
  size: Sizes;
  color: string;
  price: number;
}
