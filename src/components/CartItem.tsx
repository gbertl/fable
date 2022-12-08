import { colors, products } from '../data';
import { useAppDispatch, useAppSelector } from '../hooks';
import { replaceItems, selectItems } from '../store/slices/cart';
import { Item } from '../typings';

interface Props {
  item: Item;
}

const CartItem = ({ item }: Props) => {
  const product = products.find((p) => p.id === item.productId);
  const color = colors.find((c) => c.id === item.colorId);
  const cartItems = useAppSelector(selectItems);
  const dispatch = useAppDispatch();

  if (!product) return null;

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
    <div className="cart__item">
      <img src={product.image} className="cart__item-img" />

      <div className="cart__item-body">
        <div>
          <h1 className="cart__item-title">{product.name}</h1>

          <ul className="cart__item-desc">
            <li>Collection: {product.collection}</li>
            <li>Article: H0146027</li>
          </ul>
        </div>

        <ul className="cart__item-subdesc">
          <li>
            Size: <span className="uppercase font-bold">{item.size}</span>
          </li>
          <li className="cart__item-color">
            Color:{' '}
            <div
              className="cart__item-color-box"
              style={{
                background: color?.hex,
              }}
            ></div>
          </li>
          <li>
            Quantity:
            <div className="cart__item-quantity">
              <button
                onClick={() => handleChangeQuantity({ isIncrease: false })}
              >
                -
              </button>

              <span>{item.quantity}</span>
              <button
                onClick={() => handleChangeQuantity({ isIncrease: true })}
              >
                +
              </button>
            </div>
          </li>
        </ul>

        <p className="cart__item-footer">
          Price:{' '}
          <span className="font-bold">
            ₱{product.price * (item?.quantity || 0)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartItem;
