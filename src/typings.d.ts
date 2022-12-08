export enum Sizes {
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

export interface Product {
  id: number;
  heroImage?: string;
  image: string;
  name: string;
  collection: string;
  category: string;
  size: Sizes;
  color: string;
  price: string;
}

export interface Item {
  productId?: number;
  colorId?: number;
  size?: Sizes;
  quantity?: number;
}
