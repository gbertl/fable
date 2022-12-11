import { useParams } from 'react-router-dom';

import { BreadCrumb, Container } from '../../components';
import './style.scss';
import { categories, products } from '../../data';
import ProductCard from './ProductCard';
import { stringToHash } from '../../utils';

const Product = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id || ''));

  if (!product) return null;

  const categoryTitle =
    categories.find((c) => c.id === product.categoryId)?.name || '';

  return (
    <div className="product">
      <Container>
        <BreadCrumb
          className="product__breadcrumb"
          links={[
            {
              title: product.collection,
              url: stringToHash(product.collection),
            },
            {
              title: categoryTitle,
              url: stringToHash(categoryTitle),
            },
          ]}
        />

        {product && <ProductCard product={product} />}
      </Container>
    </div>
  );
};

export default Product;
