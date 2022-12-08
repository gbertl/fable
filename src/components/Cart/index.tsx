import { useAppSelector } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import './style.scss';
import CartItem from '../CartItem';

const Cart = () => {
  const cartItems = useAppSelector(selectItems);

  return (
    <div className="cart">
      <div className="cart__items">
        {cartItems.map((item) => (
          <CartItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
