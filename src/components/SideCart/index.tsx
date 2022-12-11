import React from 'react';
import { MdChevronLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { BsCartX } from 'react-icons/bs';
import { HashLink } from 'react-router-hash-link';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import { hideSideCart } from '../../store/slices/ui';
import { getCartTotal } from '../../utils';
import { Cart } from '../';
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

  const length = cartItems.length;

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
            Your Cart ({length} item{length > 1 ? 's' : ''})
          </h5>
        </div>

        {length ? (
          <>
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
          </>
        ) : (
          <div className="sidecart__alert">
            <BsCartX className="sidecart__alert-icon" />
            <h5 className="sidecart__alert-title">Your cart is empty</h5>
            <p className="sidecart__alert-text">
              You have no items in your shopping cart. Let's go buy something!
            </p>
            <HashLink
              to="/#fable-of-colors-section"
              className="btn btn-primary"
              onClick={() => dispatch(hideSideCart())}
            >
              Shop Now
            </HashLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideCart;
