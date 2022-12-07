import { useParams } from 'react-router-dom';

import BreadCrumb from '../../components/BreadCrumb';
import './style.scss';
import { products } from '../../data';
import ProductCard from '../../components/ProductCard';

const Product = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id || ''));

  return (
    <div className="product">
      <div className="container">
        <BreadCrumb
          className="product__breadcrumb"
          productCollection={product?.collection}
          productCategory={product?.category}
        />

        {product && <ProductCard product={product} />}
      </div>
    </div>
  );
};

export default Product;
