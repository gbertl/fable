import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { BreadCrumb, Container } from '../../components';
import { categories } from '../../data';
import ProductCard from './ProductCard';
import { stringToHash } from '../../utils';
import { Product as IProduct } from '../../typings';
import axios from '../../axios';

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
    })();
  }, []);

  if (!product) return null;

  const categoryTitle =
    categories.find((c) => c.id === product.categoryId)?.name || '';

  return (
    <section>
      <Container>
        <BreadCrumb
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
    </section>
  );
};

export default Product;
