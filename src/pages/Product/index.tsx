import { useParams } from 'react-router-dom';

import BreadCrumb from '../../components/BreadCrumb';
import './style.scss';
import { categories, products } from '../../data';
import ProductCard from '../../components/ProductCard';

const Product = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id || ''));

  if (!product) return null;

  return (
    <div className="product">
      <div className="container">
        <BreadCrumb
          className="product__breadcrumb"
          links={[
            { title: product.collection },
            {
              title:
                categories.find((c) => c.id === product.categoryId)?.name || '',
            },
          ]}
        />

        {product && <ProductCard product={product} />}
      </div>
    </div>
  );
};

export default Product;
