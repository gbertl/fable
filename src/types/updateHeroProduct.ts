import HeroProduct from './heroProduct';

interface UpdateHeroProduct
  extends Omit<HeroProduct, 'imageUrl' | 'priorityOrder'> {
  imageFile?: File;
  priorityOrder?: number;
}

export default UpdateHeroProduct;
