import './style.scss';
import { products } from '../../data';
import { Link } from 'react-router-dom';

const Products = () => {
  return (
    <section className="products">
      <div className="container">
        <h1 className="products__heading" id="fable-of-colors-section">
          Fable of Colors
        </h1>
        <h3 className="products__category-heading" id="jacket-section">
          Jacket
        </h3>
        <div className="products__cards">
          {products
            .filter((p) => p.category === 'Jacket')
            .map((p) => (
              <div key={p.id} className="products__card">
                <Link to={`/products/${p.id}`}>
                  <img src={p.image} alt="" className="products__card-img" />
                </Link>
                <div className="products__card-body">
                  <h5 className="products__card-title">{p.name}</h5>
                  <span className="products__card-price">₱{p.price}</span>
                </div>
              </div>
            ))}
        </div>
        <h3 className="products__category-heading" id="shorts-section">
          Shorts
        </h3>
        <div className="products__cards">
          {products
            .filter((p) => p.category === 'Shorts')
            .map((p) => (
              <div key={p.id} className="products__card">
                <Link to={`/products/${p.id}`}>
                  <img src={p.image} alt="" className="products__card-img" />
                </Link>
                <div className="products__card-body">
                  <h5 className="products__card-title">{p.name}</h5>
                  <span className="products__card-price">₱{p.price}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
