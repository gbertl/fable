import { Product } from './products';

export interface HeroProduct {
  _id: string;
  imageUrl: string;
  product?: Product | string;
  priorityOrder: number;
}

export interface NewHeroProduct
  extends Omit<HeroProduct, '_id' | 'imageUrl' | 'priorityOrder'> {
  imageFile: File;
  priorityOrder?: number;
}

export interface UpdateHeroProduct {
  product?: string;
  imageFile?: File;
  priorityOrder?: number;
}
