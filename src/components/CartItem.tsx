import { colors, products } from '../data';
import { Item } from '../typings';

interface Props {
  item: Item;
}

const CartItem = ({ item }: Props) => {
  const product = products.find((p) => p.id === item.productId);
  const color = colors.find((c) => c.id === item.colorId);

  if (!product) return null;

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
          <li>
            Color: <span className="font-bold">{color?.hex}</span>
          </li>
          <li>
            Quantity:
            <div className="cart__item-quantity">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
          </li>
        </ul>

        <p className="cart__item-footer">
          Price: <span className="font-bold">{product.price}</span>
        </p>
      </div>
    </div>
  );
};

export default CartItem;
