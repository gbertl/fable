import { useParams } from 'react-router-dom';

import { BreadCrumb, Container } from '../../components';
import ProductCard from './ProductCard';
import { stringToHypen } from '../../utils';
import { Product as IProduct } from '../../typings';
import axios from '../../axios';
import { useQuery } from 'react-query';

const Product = () => {
  const { id } = useParams();

  const { data: product } = useQuery<IProduct>(
    ['product', id],
    async ({ queryKey }) => {
      const { data } = await axios.get(
        `/products/${queryKey[1]}?fields[0]=heroImageUrl&populate[0]=category`
      );
      return data;
    }
  );

  return (
    <section className="mb-11">
      <Container>
        <BreadCrumb
          links={[
            {
              title: product?.collectionName || '',
              url: `/collections#${stringToHypen(
                product?.collectionName || ''
              )}-section`,
            },
            {
              title: product?.category || '',
              url: `/collections#${stringToHypen(
                product?.category || ''
              )}-section`,
            },
          ]}
        />

        {product && <ProductCard product={product} />}
      </Container>
    </section>
  );
};

export default Product;
