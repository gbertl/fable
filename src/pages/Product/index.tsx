import BreadCrumb from '../../components/BreadCrumb';
import productShort5 from '../../assets/images/product-short-5.png';
import './style.scss';

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
  return (
    <div className="product">
      <div className="container">
        <BreadCrumb className="product__breadcrumb" />

        <div className="product__card">
          <img src={productShort5} alt="" className="product__card-img" />
          <div className="product__card-body">
            <h1 className="product__card-title">Shorts CLR Black</h1>
            <h2 className="product__card-subtitle">$9</h2>
            <ul className="product__card-colors">
              {colors.map((color, idx) => (
                <li
                  key={idx}
                  className="product__card-color"
                  style={{
                    background: color,
                    border: `1px solid ${
                      idx === 1 ? 'rgba(60, 55, 55, 0.8)' : 'rgba(0, 0, 0, 0.1)'
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
