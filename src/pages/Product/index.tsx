import { useParams } from 'react-router-dom';

import BreadCrumb from '../../components/BreadCrumb';
import './style.scss';
import { products } from '../../data';

const colors = [
  '#F4E1CC',
  '#262626',
  '#9FAED9',
  '#56AA91',
  '#707070',
  '#743821',
  '#C89607',
  '#214133',
];

const sizes = ['xs', 's', 'm', 'l', 'xl'];

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

        <div className="product__card">
          <img src={product?.image} alt="" className="product__card-img" />
          <div className="product__card-body">
            <h1 className="product__card-title">{product?.name}</h1>
            <h2 className="product__card-subtitle">{product?.price}</h2>
            <ul className="product__card-colors">
              {colors.map((color, idx) => (
                <li
                  key={idx}
                  className="product__card-color"
                  style={{
                    background: color,
                    border: `1px solid ${
                      idx === 0 ? 'rgba(60, 55, 55, 0.8)' : 'rgba(0, 0, 0, 0.1)'
                    }`,
                  }}
                ></li>
              ))}
            </ul>

            <ul className="product__card-sizes">
              {sizes.map((size) => (
                <li key={size} className="product__card-size">
                  {size}
                </li>
              ))}
            </ul>

            <button className="btn btn-primary">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
