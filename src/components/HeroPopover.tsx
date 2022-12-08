import { Link } from 'react-router-dom';
import { products } from '../data';

interface Props {
  productId: number;
}

const HeroPopover = ({ productId }: Props) => {
  const product = products.find((p) => p.id === productId);

  return (
    <div className="hero__popover">
      <div className="hero__popover-img">
        <img src={product?.image} alt="" />
      </div>

      <div className="hero__popover-body">
        <h1 className="hero__popover-title">{product?.name}</h1>
        <ul className="hero__popover-desc">
          <li>
            Collection:{' '}
            <span className="font-bold uppercase">{product?.collection}</span>
          </li>
          <li>
            Article: <span className="font-bold">H0146027</span>
          </li>
        </ul>
        <ul className="hero__popover-subdesc">
          <li>
            Size: <span className="font-bold uppercase">{product?.size}</span>
          </li>
          <li className="hero__popover-color">
            Color:{' '}
            <div
              className="hero__popover-color-box"
              style={{
                background: product?.color,
                border: '1px solid var(--dark)',
              }}
            ></div>
          </li>
        </ul>
        <div className="hero__popover-footer">
          <span>
            Price: <span className="font-bold">₱{product?.price}</span>
          </span>
          <Link to={`/products/${product?.id}`} className="font-bold">
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroPopover;
