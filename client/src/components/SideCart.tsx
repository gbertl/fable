import React, { useEffect } from 'react';
import { MdChevronLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { BsCartX } from 'react-icons/bs';
import { motion } from 'framer-motion';

import {
  useAppDispatch,
  useAppSelector,
  useGetCartTotal,
  useHideScrollbar,
} from '../hooks';
import { selectItems } from '../store/slices/cart';
import { hideSideCart } from '../store/slices/ui';
import { Cart } from '.';
import Button from './Button';
import { appRoutes } from '../routes';

const SideCart = () => {
  const cartItems = useAppSelector(selectItems);
  const total = useGetCartTotal();
  const dispatch = useAppDispatch();

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as Element;

    if (!target.closest('.sidecart__body')) {
      dispatch(hideSideCart());
    }
  };

  const length = cartItems.length;

  useHideScrollbar();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-full z-[9999] bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <motion.div
        initial={{ opacity: 0, x: '75%' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0, x: '80%' }}
        className="sm:w-max h-full bg-white p-5 flex flex-col ml-auto sidecart__body"
      >
        <div className="flex gap-4 items-center mb-8">
          <button
            className="flex items-center text-2xl"
            onClick={() => dispatch(hideSideCart())}
          >
            <MdChevronLeft />
          </button>
          <h5 className="text-gray text-lg">
            Your Cart ({length} item{length > 1 ? 's' : ''})
          </h5>
        </div>

        {length ? (
          <>
            <Cart className="overflow-auto mb-5" />

            <div className="mt-auto">
              <p className="flex justify-between text-xl font-medium mb-3">
                Total: <span>₱{total}</span>
              </p>

              <Button
                as={Link}
                to={appRoutes.checkout}
                className="w-full"
                onClick={() => dispatch(hideSideCart())}
              >
                Proceed to checkout
              </Button>
            </div>
          </>
        ) : (
          <div className="grid place-items-center h-3/4">
            <div className="lg:w-[333px] text-center">
              <BsCartX className="text-8xl mb-5 relative left-1/2 -translate-x-1/2" />
              <h5 className="text-2xl mb-2">Your cart is empty</h5>
              <p className="text-sm mb-8">
                You have no items in your shopping cart.
                <br /> Let's go buy something!
              </p>
              <Button
                as={Link}
                to={appRoutes.collections}
                onClick={() => dispatch(hideSideCart())}
              >
                Shop Now
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SideCart;
