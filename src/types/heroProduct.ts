import Product from './product';

interface HeroProduct {
  _id: string;
  imageUrl: string;
  product?: Product | string;
  priorityOrder: number;
}

export default HeroProduct;
