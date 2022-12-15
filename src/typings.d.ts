export enum Sizes {
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  heroImage?: string;
  image: string;
  name: string;
  collection: string;
  categoryId: number;
  size: Sizes;
  color: string;
  price: number;
}

export interface Item {
  productId?: number;
  colorId?: number;
  size?: Sizes;
  quantity?: number;
}

export interface HeroProduct {
  id: number;
  heroImage: string;
}
