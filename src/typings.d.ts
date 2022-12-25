export enum Sizes {
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

export enum Categories {
  Jacket = 'jacket',
  Shorts = 'shorts',
}

export interface Product {
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

export interface Item {
  productId?: string;
  colorId?: number;
  size?: Sizes;
  quantity?: number;
}

export interface HeroProduct {
  _id: string;
  imageUrl: string;
  product?: Product | string;
}

export enum DeliveryMethods {
  PickUp = 'pick-up',
  ToDoor = 'to-door',
}

export enum PaymentMethods {
  Card = 'card',
  Cod = 'cod',
}

export interface Order {
  city: string;
  deliveryMethod: DeliveryMethods;
  address: string;
  loyaltyCard: number;
  name: string;
  phone: number;
  email: string;
  paymentMethod: PaymentMethods;
  orderComment: string;
  agree: boolean;
}

export interface NewProduct
  extends Omit<Product, '_id' | 'heroImageUrl' | 'imageUrl' | 'createdAt'> {
  imageFile: File | undefined;
}

export interface NewHeroProduct {
  product?: number;
  imageFile: File;
}
