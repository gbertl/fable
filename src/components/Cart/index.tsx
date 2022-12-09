import { useAppSelector } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import './style.scss';
import CartItem from './CartItem';

interface Props {
  className?: string;
  style?: Object;
}

const Cart = ({ className, style }: Props) => {
  const cartItems = useAppSelector(selectItems);

  return (
    <div className={`cart ${className ? className : ''}`} style={style}>
      <div className="cart__items">
        {cartItems.map((item) => (
          <CartItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
