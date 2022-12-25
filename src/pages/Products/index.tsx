import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { HiPlusCircle } from 'react-icons/hi2';
import { useAuth0 } from '@auth0/auth0-react';
import { AnimatePresence } from 'framer-motion';

import { Container } from '../../components';
import { Categories, Product } from '../../typings.d';
import axios from '../../axios';
import ProductCard from './ProductCard';
import ProductFormModal from './ProductFormModal';
import { useCheckAdminRole } from '../../hooks';

enum SortBy {
  Price = 'price',
  New = 'newest',
}

export interface ImgLoaded {
  productId: string;
  loaded: boolean;
}

const Products = () => {
  const { isAuthenticated } = useAuth0();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(Categories.Jacket);

  const [imgsLoaded, setImgsLoaded] = useState<ImgLoaded[]>([]);

  const { data: productsData } = useQuery<Product[]>('products', async () => {
    const { data } = await axios.get('/products');
    return data;
  });

  const [products, setProducts] = useState<Product[]>();

  const isAdmin = useCheckAdminRole();

  useEffect(() => {
    setProducts(
      productsData
        ?.slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    );

    productsData?.forEach((p) => {
      setImgsLoaded((prevImgLoaded) => [
        ...prevImgLoaded,
        { productId: p._id, loaded: false },
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
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setProducts(filteredProducts);
    }
  };

  const handleOpenForm = (category: Categories) => {
    setCurrentCategory(category);
    document.body.classList.add('hide-scrollbar');
    setIsFormOpen(true);
  };

  return (
    <>
      <section className="mt-8 md:mt-11">
        <Container>
          <h1
            className="uppercase text-center text-2xl md:text-4xl text-dark mb-3 md:mb-8"
            id="fable-of-klassik-section"
          >
            Fable of Klassik
          </h1>

          {Object.values(Categories)?.map((c, idx) => (
            <React.Fragment key={idx}>
              <div className="flex justify-between">
                <div className="my-5 flex items-center gap-3">
                  <h3
                    className="text-base md:text-xl text-dark capitalize"
                    id={`${c}-section`}
                  >
                    {c}
                  </h3>

                  {isAuthenticated && isAdmin && (
                    <button
                      className="text-3xl"
                      onClick={() => handleOpenForm(c)}
                    >
                      <HiPlusCircle />
                    </button>
                  )}
                </div>

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
                  ?.filter((p) => p.category === c)
                  .map((p) => (
                    <ProductCard
                      product={p}
                      imgsLoaded={imgsLoaded}
                      setImgsLoaded={setImgsLoaded}
                      key={p._id}
                    />
                  ))}
              </div>
            </React.Fragment>
          ))}
        </Container>
      </section>

      <AnimatePresence>
        {currentCategory && isFormOpen && (
          <ProductFormModal
            setIsFormOpen={setIsFormOpen}
            currentCategory={currentCategory}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Products;
