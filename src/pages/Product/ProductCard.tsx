import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Skeleton } from '@mui/material';

import { Item, Product } from '../../types';
import { Sizes } from '../../enums';
import { sizes, colors } from '../../data';
import { replaceItems, selectItems } from '../../store/slices/cart';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { findCartItem } from '../../utils';
import { showSideCart } from '../../store/slices/ui';
import { Button } from '../../components';
import ProductSlider from './ProductSlider';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [data, setData] = useState<Item>({ productId: product._id });

  const cartItems = useAppSelector(selectItems);

  const [imgLoaded, setImgLoaded] = useState(false);

  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

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
        cartItem.color === data.color &&
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

  const handleChangeColor = (color: string) =>
    setData((prevData) => {
      const existingItem = findCartItem(cartItems, { ...prevData, color });

      if (existingItem) {
        return existingItem;
      } else {
        return {
          ...prevData,
          color,
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
        ci.color === data.color &&
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

  useEffect(() => {
    setData((prevData) => {
      const cartItem = findCartItem(cartItems, prevData);

      if (!cartItem) {
        return {
          ...prevData,
          quantity: 0,
        };
      } else {
        return { ...prevData, quantity: cartItem.quantity };
      }
    });
  }, [cartItems]);

  return (
    <div className="grid lg:grid-cols-[40%_60%]">
      {!imgLoaded ? (
        <>
          <img
            src={product.imageUrl || product.heroImageUrl}
            alt=""
            className="hidden"
            onLoad={() => setImgLoaded(true)}
          />
          <Skeleton
            variant="rectangular"
            height={isMobile ? 333 : 644}
            sx={{ marginBottom: isMobile ? '0.75rem' : '0' }}
          />
        </>
      ) : (
        <>
          {product.heroImageUrl ? (
            <ProductSlider
              image={product.imageUrl}
              heroImage={product.heroImageUrl}
            />
          ) : (
            <div className="w-full h-[333px] lg:h-[674px] bg-gray2 mb-3 lg:mb-0 flex justify-center items-end">
              <img
                src={product.imageUrl}
                alt=""
                className="object-cover h-[313px] lg:h-[644px]"
              />
            </div>
          )}
        </>
      )}

      <div className="lg:px-8">
        <h1 className="text-sm lg:text-3xl mb-1 lg:mb-2 text-gray lg:text-dark text-center lg:text-left lg:uppercase">
          {product.name}
        </h1>
        <h2 className="mb-3 lg:mb-8 text-base lg:text-3xl text-center lg:text-left">
          ₱{product.price}
        </h2>

        <h3 className="lg:hidden text-base lg:text-xl font-normal mb-5 lg:mb-0 text-center">
          Color
        </h3>
        <ul className="flex justify-center lg:justify-start gap-5 lg:gap-8 flex-wrap mb-5 lg:mb-8">
          {colors.map((color, idx) => (
            <li key={idx}>
              <input
                type="radio"
                name="item-color"
                id={`item-color-${idx}`}
                value={color}
                onChange={() => handleChangeColor(color)}
                className="hidden"
              />
              <label
                htmlFor={`item-color-${idx}`}
                className={`block w-5 h-5 lg:w-10 lg:h-10 border border-black hover:border-gray border-opacity-10 ${
                  data.color === color
                    ? 'border-gray cursor-auto'
                    : 'cursor-pointer'
                }`}
                style={{ background: color }}
              ></label>
            </li>
          ))}
        </ul>
        <h3 className="lg:hidden text-base lg:text-xl font-normal mb-5 lg:mb-0 text-center">
          Size
        </h3>
        <ul className="flex justify-center lg:justify-start flex-wrap gap-5 lg:gap-8 uppercase leading-none mb-5 lg:mb-8">
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
                className={`block p-3 border border-black hover:border-gray border-opacity-10 lg:text-2xl ${
                  data.size === size
                    ? 'border-gray cursor-auto'
                    : 'cursor-pointer'
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
            <div className="flex items-center flex-col lg:flex-row mb-5">
              <h3 className="text-base lg:text-xl font-normal mb-5 lg:mb-0 text-center">
                Quantity <span className="hidden lg:inline">:</span>
              </h3>
              <div className="flex gap-3 ml-5 lg:text-xl">
                <button
                  className="p-3"
                  onClick={() => handleUpdateQuantity({ isIncrease: false })}
                >
                  -
                </button>

                <input
                  type="number"
                  value={data.quantity}
                  onChange={handleKeyupQuantity}
                  className="w-9 outline-none text-center"
                />

                <button
                  className="p-3"
                  onClick={() => handleUpdateQuantity({ isIncrease: true })}
                >
                  +
                </button>
              </div>
            </div>

            <Button
              variant="success"
              className="w-full lg:w-auto"
              onClick={() => dispatch(showSideCart())}
            >
              Go to cart
            </Button>
          </>
        ) : (
          <Button
            className="w-full lg:w-auto"
            onClick={handleAddToCart}
            disabled={data.color && data.size ? false : true}
          >
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
