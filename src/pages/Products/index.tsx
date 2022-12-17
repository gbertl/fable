import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { categories } from '../../data';
import { Container } from '../../components';
import { Product } from '../../typings';
import axios from '../../axios';
import ProductCard from './ProductCard';

enum SortBy {
  Price = 'price',
  New = 'newest',
}

export interface ImgLoaded {
  productId: number;
  loaded: boolean;
}

const Products = () => {
  const [imgsLoaded, setImgsLoaded] = useState<ImgLoaded[]>([]);

  const { data: productsData } = useQuery<Product[]>('products', async () => {
    const { data } = await axios.get('/products');
    return data;
  });

  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    setProducts(productsData?.slice().sort((a, b) => b.id - a.id));
    productsData?.forEach((p) => {
      setImgsLoaded((prevImgLoaded) => [
        ...prevImgLoaded,
        { productId: p.id, loaded: false },
      ]);
    });
  }, [productsData]);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === SortBy.Price) {
      const filteredProducts = productsData
        ?.slice()
        .sort((a, b) => a.price - b.price);
      setProducts(filteredProducts);
    } else if (e.target.value === SortBy.New) {
      const filteredProducts = productsData
        ?.slice()
        .sort((a, b) => b.id - a.id);
      setProducts(filteredProducts);
    }
  };

  return (
    <section className="mt-8 md:mt-11">
      <Container>
        <h1
          className="uppercase text-center text-2xl md:text-4xl text-dark mb-3 md:mb-8"
          id="fable-of-klassik-section"
        >
          Fable of Klassik
        </h1>

        {categories.map((c, idx) => (
          <React.Fragment key={c.id}>
            <div className="flex justify-between">
              <h3
                className="text-base md:text-xl text-dark my-5 capitalize"
                id={`${c.name}-section`}
              >
                {c.name}
              </h3>

              {idx === 0 && (
                <div className="flex items-center">
                  <h3 className="text-base md:text-xl text-dark my-5">
                    Sort by
                  </h3>
                  <select
                    onChange={handleSort}
                    className="text-base md:text-xl ml-2 md:ml-4 capitalize text-gray outline-none bg-transparent"
                  >
                    <option value={SortBy.New}>{SortBy.New}</option>
                    <option value={SortBy.Price}>{SortBy.Price}</option>
                  </select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-8 mb-5 md:mb-8">
              {products
                ?.filter((p) => p.categoryId === c.id)
                .map((p) => (
                  <ProductCard
                    product={p}
                    imgsLoaded={imgsLoaded}
                    setImgsLoaded={setImgsLoaded}
                    key={p.id}
                  />
                ))}
            </div>
          </React.Fragment>
        ))}
      </Container>
    </section>
  );
};

export default Products;
