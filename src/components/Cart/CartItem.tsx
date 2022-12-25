import { useQuery } from 'react-query';

import { colors } from '../../data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { replaceItems, selectItems } from '../../store/slices/cart';
import { Item, Product } from '../../typings';
import axios from '../../axios';

interface Props {
  item: Item;
}

const CartItem = ({ item }: Props) => {
  const { data: product } = useQuery<Product>(
    ['product', item.productId],
    async ({ queryKey }) => {
      const { data } = await axios.get(`/products/${queryKey[1]}`);
      return data;
    }
  );

  const color = colors.find((c) => c.id === item.colorId);
  const cartItems = useAppSelector(selectItems);
  const dispatch = useAppDispatch();

  const handleChangeQuantity = ({ isIncrease }: { isIncrease: boolean }) => {
    const updatedCartItems = cartItems.map((ci) => {
      if (
        ci.productId === item.productId &&
        ci.colorId === item.colorId &&
        ci.size === item.size
      ) {
        if (isIncrease) {
          return {
            ...ci,
            quantity: (ci?.quantity || 0) + 1,
          };
        } else {
          return {
            ...ci,
            quantity: (ci?.quantity || 0) - 1,
          };
        }
      } else {
        return ci;
      }
    });

    dispatch(replaceItems(updatedCartItems));
  };

  return (
    <div className="grid gap-5 grid-cols-[1fr_55%] md:grid-cols-[1fr_65%]">
      <img
        src={product?.imageUrl}
        className="h-[203px] object-cover bg-gray2"
      />

      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-base font-normal mb-2">{product?.name}</h1>

          <ul className="text-xs text-gray">
            <li className="mb-2">Collection: {product?.collectionName}</li>
            <li>Article: H0146027</li>
          </ul>
        </div>

        <ul className="flex justify-between flex-wrap gap-4 text-sm w-full">
          <li>
            Size: <span className="uppercase font-medium">{item.size}</span>
          </li>
          <li className="flex items-center gap-3">
            Color:{' '}
            <div
              className="inline-block w-5 h-5"
              style={{
                background: color?.hex,
              }}
            ></div>
          </li>
          <li>
            Quantity:
            <div className="inline-flex items-center leading-none gap-1 ml-3">
              <button
                onClick={() => handleChangeQuantity({ isIncrease: false })}
                className="px-2"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => handleChangeQuantity({ isIncrease: true })}
                className="px-2"
              >
                +
              </button>
            </div>
          </li>
        </ul>

        <div className="flex justify-between items-center text-sm">
          <div>
            Price:{' '}
            <span className="font-medium">
              ₱{(product?.price || 0) * (item?.quantity || 0)}
            </span>
          </div>

          <button
            className="text-gray hover:text-dark"
            onClick={() =>
              dispatch(replaceItems(cartItems.filter((ci) => ci !== item)))
            }
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
