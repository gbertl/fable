import { categories, products } from '../data';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Container } from '../components';

enum SortBy {
  Price = 'price',
  New = 'newest',
}

const Products = () => {
  const [productsData, setProductsData] = useState(products);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === SortBy.Price) {
      const filteredProducts = products
        .slice()
        .sort((a, b) => a.price - b.price);
      setProductsData(filteredProducts);
    } else if (e.target.value === SortBy.New) {
      const filteredProducts = products.slice().sort((a, b) => b.id - a.id);
      setProductsData(filteredProducts);
    }
  };

  return (
    <section className="mt-28 md:mt-32">
      <Container>
        <h1
          className="uppercase text-center text-2xl md:text-4xl text-dark mb-3 md:mb-8"
          id="fable-of-colors-section"
        >
          Fable of Colors
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
              {productsData
                .filter((p) => p.categoryId === c.id)
                .map((p) => (
                  <div key={p.id}>
                    <Link to={`/products/${p.id}`}>
                      <img src={p.image} alt="" className="bg-gray2 mb-3" />
                    </Link>
                    <div className="text-center">
                      <h5 className="text-xs md:text-lg mb-1 text-gray">
                        {p.name}
                      </h5>
                      <span className="text-sm md:text-xl font-medium">
                        ₱{p.price}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </React.Fragment>
        ))}
      </Container>
    </section>
  );
};

export default Products;
