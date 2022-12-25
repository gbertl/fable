import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { HiPlusCircle } from 'react-icons/hi2';
import { useAuth0 } from '@auth0/auth0-react';
import { AnimatePresence } from 'framer-motion';

import { Container } from '../../components';
import { Category, Product } from '../../typings.d';
import axios from '../../axios';
import ProductCard from './ProductCard';
import { checkAdminRole } from '../../utils';
import ProductFormModal from './ProductFormModal';

enum SortBy {
  Price = 'price',
  New = 'newest',
}

export interface ImgLoaded {
  productId: string;
  loaded: boolean;
}

const Products = () => {
  const { isAuthenticated, user } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<string>();

  const [imgsLoaded, setImgsLoaded] = useState<ImgLoaded[]>([]);

  const { data: productsData } = useQuery<Product[]>('products', async () => {
    const { data } = await axios.get('/products');
    return data;
  });

  const { data: categories } = useQuery<Category[]>('categories', async () => {
    const { data } = await axios.get('/categories');
    return data;
  });

  const [products, setProducts] = useState<Product[]>();

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

  useEffect(() => {
    if (user) setIsAdmin(checkAdminRole(user));
  }, [user]);

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

  const handleOpenForm = (categoryId: string) => {
    setCurrentCategoryId(categoryId);
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

          {categories?.map((c, idx) => (
            <React.Fragment key={c._id}>
              <div className="flex justify-between">
                <div className="my-5 flex items-center gap-3">
                  <h3
                    className="text-base md:text-xl text-dark capitalize"
                    id={`${c.name}-section`}
                  >
                    {c.name}
                  </h3>

                  {isAuthenticated && isAdmin && (
                    <button
                      className="text-3xl"
                      onClick={() => handleOpenForm(c._id)}
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
                  ?.filter((p) => p.category === c._id)
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
        {currentCategoryId && isFormOpen && (
          <ProductFormModal
            setIsFormOpen={setIsFormOpen}
            categories={categories}
            currentCategoryId={currentCategoryId}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Products;
