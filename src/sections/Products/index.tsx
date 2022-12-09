import './style.scss';
import { categories, products } from '../../data';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

enum SortBy {
  Price = 'price',
  New = 'new',
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
    <section className="products">
      <div className="container">
        <h1 className="products__heading" id="fable-of-colors-section">
          Fable of Colors
        </h1>

        {categories.map((c, idx) => (
          <React.Fragment key={c.id}>
            <div className="products__cards-header">
              <h3
                className="products__subheading capitalize"
                id={`${c.name}-section`}
              >
                {c.name}
              </h3>

              {idx === 0 && (
                <div className="flex items-center">
                  <h3 className="products__subheading">Sort by</h3>
                  <select onChange={handleSort} className="products__sort">
                    <option value={SortBy.New}>{SortBy.New}</option>
                    <option value={SortBy.Price}>{SortBy.Price}</option>
                  </select>
                </div>
              )}
            </div>

            <div className="products__cards">
              {productsData
                .filter((p) => p.categoryId === c.id)
                .map((p) => (
                  <div key={p.id} className="products__card">
                    <Link to={`/products/${p.id}`}>
                      <img
                        src={p.image}
                        alt=""
                        className="products__card-img"
                      />
                    </Link>
                    <div className="products__card-body">
                      <h5 className="products__card-title">{p.name}</h5>
                      <span className="products__card-price">₱{p.price}</span>
                    </div>
                  </div>
                ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Products;
