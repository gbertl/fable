import { useRef, useState } from 'react';

import { Item, Product, Sizes } from '../typings.d';
import { sizes, colors } from '../data';
import { addToCart } from '../store/slices/cart';
import { useAppDispatch } from '../hooks';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [data, setData] = useState<Item>({
    productId: product.id,
  });

  const dispatch = useAppDispatch();

  const addToCartRef = useRef<HTMLButtonElement>(null);
  const goToCartRef = useRef<HTMLAnchorElement>(null);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(addToCart(data));
    goToCartRef.current?.classList.remove('hidden');
    addToCartRef.current?.classList.add('hidden');
  };

  return (
    <div className="product__card">
      <img src={product?.image} alt="" className="product__card-img" />
      <div className="product__card-body">
        <h1 className="product__card-title">{product?.name}</h1>
        <h2 className="product__card-subtitle">{product?.price}</h2>

        <h3 className="hidden-md product__card-section-heading">Color</h3>
        <ul className="product__card-colors">
          {colors.map((color) => (
            <li key={color.id}>
              <input
                type="radio"
                name="item-color"
                id={`item-color-${color.id}`}
                value={color.id}
                onChange={() =>
                  setData((prevData) => ({
                    ...prevData,
                    colorId: color.id,
                  }))
                }
                className="hidden"
              />
              <label
                htmlFor={`item-color-${color.id}`}
                className={`product__card-color product__card-radio ${
                  data.colorId === color.id ? 'product__card-radio--active' : ''
                }`}
                style={{ background: color.hex }}
              ></label>
            </li>
          ))}
        </ul>

        <h3 className="hidden-md product__card-section-heading">Size</h3>
        <ul className="product__card-sizes">
          {sizes.map((size) => (
            <li key={size}>
              <input
                type="radio"
                name="item-size"
                id={`item-size-${size}`}
                onChange={() => setData((prevData) => ({ ...prevData, size }))}
                className="hidden"
              />
              <label
                htmlFor={`item-size-${size}`}
                className={`product__card-size product__card-radio ${
                  data.size === size ? 'product__card-radio--active' : ''
                }`}
              >
                {size}
              </label>
            </li>
          ))}
        </ul>

        <button
          className="btn btn-primary product__card-btn"
          onClick={handleAddToCart}
          disabled={data.colorId && data.size ? false : true}
          ref={addToCartRef}
        >
          Add to cart
        </button>

        <Link
          to="/checkout"
          className="btn btn-success product__card-btn hidden"
          ref={goToCartRef}
        >
          Go to cart
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
