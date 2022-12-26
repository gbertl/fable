import Product from './product';

interface NewProduct
  extends Omit<Product, '_id' | 'heroImageUrl' | 'imageUrl' | 'createdAt'> {
  imageFile: File | undefined;
}

export default NewProduct;
