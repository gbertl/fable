export enum Sizes {
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

export interface Category {
  _id: number;
  name: string;
}

export interface Product {
  _id: number;
  heroImageUrl?: string;
  imageUrl: string;
  name: string;
  collectionName: string;
  category: Category | number;
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
  _id: number;
  imageUrl: string;
  product?: Product | number;
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
