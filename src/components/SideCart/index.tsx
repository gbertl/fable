import React from 'react';
import { MdChevronLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import { hideSideCart } from '../../store/slices/ui';
import { getCartTotal } from '../../utils';
import Cart from '../Cart';
import './style.scss';

const SideCart = () => {
  const cartItems = useAppSelector(selectItems);
  const total = getCartTotal(cartItems);
  const dispatch = useAppDispatch();

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as Element;

    if (!target.closest('.sidecart__body')) {
      dispatch(hideSideCart());
    }
  };

  return (
    <div className="sidecart" onClick={handleClickOutside}>
      <div className="sidecart__body">
        <div className="sidecart__header">
          <button
            className="sidecart__close"
            onClick={() => dispatch(hideSideCart())}
          >
            <MdChevronLeft />
          </button>
          <h5 className="sidecart__heading">
            Your Cart ({cartItems.length} items)
          </h5>
        </div>
        <Cart className="sidecart__cart" />

        <div className="sidecart__footer">
          <p className="sidecart__footer-total">
            Total: <span>₱{total}</span>
          </p>

          <Link
            to="/checkout"
            className="btn btn-primary sidecart__checkout-btn"
            onClick={() => dispatch(hideSideCart())}
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideCart;
