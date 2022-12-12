import { Button } from '../../components';
import { useAppSelector } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import { getCartTotal } from '../../utils';

const CheckoutSummary = () => {
  const cartItems = useAppSelector(selectItems);

  const total = getCartTotal(cartItems);

  return (
    <div className="w-[65%] mt-16 ml-auto">
      <ul className="mb-6">
        <li className="flex justify-between text-xs mb-2">
          Summary: <span>₱{total}</span>
        </li>
        <li className="flex justify-between text-xs mb-2">
          Delivery: <span>₱0</span>
        </li>
        <li className="flex justify-between text-xs mb-2">
          Promocode: <span>₱0</span>
        </li>
      </ul>

      <p className="flex justify-between text-xl font-medium mb-3">
        Total: <span>₱{total}</span>
      </p>

      <div className="form__group">
        <input
          type="text"
          placeholder="Enter promocode"
          className="form__input"
        />
        <Button>Apply</Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
