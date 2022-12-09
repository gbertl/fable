import { useAppSelector } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import { getCartTotal } from '../../utils';

const CheckoutSummary = () => {
  const cartItems = useAppSelector(selectItems);

  const total = getCartTotal(cartItems);

  return (
    <div className="checkout__summary">
      <ul className="checkout__summary-details">
        <li>
          Summary: <span>₱{total}</span>
        </li>
        <li>
          Delivery: <span>₱0</span>
        </li>
        <li>
          Promocode: <span>₱0</span>
        </li>
      </ul>

      <p className="checkout__summary-total">
        Total: <span>₱{total}</span>
      </p>

      <div className="form__group">
        <input
          type="text"
          placeholder="Enter promocode"
          className="form__input"
        />
        <button className="btn btn-primary">Apply</button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
