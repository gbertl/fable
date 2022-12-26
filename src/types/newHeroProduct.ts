import HeroProduct from './heroProduct';

interface NewHeroProduct
  extends Omit<HeroProduct, '_id' | 'imageUrl' | 'priorityOrder'> {
  imageFile: File;
  priorityOrder?: number;
}

export default NewHeroProduct;
