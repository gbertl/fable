import { useAppSelector } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import CartItem from './CartItem';

interface Props {
  className?: string;
  style?: Object;
}

const Cart = ({ className, style }: Props) => {
  const cartItems = useAppSelector(selectItems);

  return (
    <div className={`${className ? className : ''}`} style={style}>
      <div className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <CartItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
