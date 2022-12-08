import React, { useState } from 'react';

import { Item, Product, Sizes } from '../typings.d';
import { sizes, colors } from '../data';
import { replaceItems, selectItems } from '../store/slices/cart';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Link } from 'react-router-dom';
import { findCartItem } from '../utils';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [data, setData] = useState<Item>({ productId: product.id });

  const cartItems = useAppSelector(selectItems);

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    const item = {
      ...data,
      quantity: (data.quantity || 0) + 1,
    };

    dispatch(replaceItems([...cartItems, item]));

    setData(item);
  };

  const handleUpdateQuantity = ({ isIncrease }: { isIncrease: boolean }) => {
    const items = cartItems.map((cartItem) => {
      if (
        cartItem.productId === data.productId &&
        cartItem.colorId === data.colorId &&
        cartItem.size === data.size
      ) {
        const quantity = isIncrease
          ? (cartItem.quantity || 0) + 1
          : (cartItem.quantity || 0) - 1;

        setData((prevData) => ({ ...prevData, quantity }));

        return {
          ...cartItem,
          quantity,
        };
      } else {
        return cartItem;
      }
    });

    dispatch(replaceItems(items));
  };

  const handleChangeColor = (colorId: number) =>
    setData((prevData) => {
      const existingItem = findCartItem(cartItems, { ...prevData, colorId });

      if (existingItem) {
        return existingItem;
      } else {
        return {
          ...prevData,
          colorId,
          quantity: 0,
        };
      }
    });

  const handleChangeSize = (size: Sizes) => {
    setData((prevData) => {
      const existingItem = findCartItem(cartItems, { ...prevData, size });

      if (existingItem) {
        return existingItem;
      } else {
        return { ...prevData, size, quantity: 0 };
      }
    });
  };

  const handleKeyupQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const item = {
      ...data,
      quantity: parseInt(e.target.value) || 0,
    };

    const updatedCartItems = cartItems.map((ci) => {
      if (
        ci.productId === data.productId &&
        ci.colorId === data.colorId &&
        ci.size === data.size
      ) {
        return item;
      } else {
        return ci;
      }
    });

    dispatch(replaceItems(updatedCartItems));
    setData(item);
  };

  return (
    <div className="product__card">
      <img src={product?.image} alt="" className="product__card-img" />
      <div className="product__card-body">
        <h1 className="product__card-title">{product?.name}</h1>
        <h2 className="product__card-subtitle">₱{product?.price}</h2>

        <h3 className="hidden-md product__card-section-heading">Color</h3>
        <ul className="product__card-colors">
          {colors.map((color) => (
            <li key={color.id}>
              <input
                type="radio"
                name="item-color"
                id={`item-color-${color.id}`}
                value={color.id}
                onChange={() => handleChangeColor(color.id)}
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
                onChange={() => handleChangeSize(size)}
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

        {data.quantity ? (
          <>
            {/* Quantity */}
            <div className="product__card-quantity">
              <h3 className="product__card-section-heading">Quantity:</h3>
              <div className="product__card-quantity-ctrl">
                <button
                  className="product__card-quantity-btn"
                  onClick={() => handleUpdateQuantity({ isIncrease: false })}
                >
                  -
                </button>

                <input
                  type="number"
                  value={data.quantity}
                  onChange={handleKeyupQuantity}
                  className="product__card-quantity-input"
                />

                <button
                  className="product__card-quantity-btn"
                  onClick={() => handleUpdateQuantity({ isIncrease: true })}
                >
                  +
                </button>
              </div>
            </div>

            <Link to="/checkout" className="btn btn-success product__card-btn">
              Go to cart
            </Link>
          </>
        ) : (
          <button
            className="btn btn-primary product__card-btn"
            onClick={handleAddToCart}
            disabled={data.colorId && data.size ? false : true}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
