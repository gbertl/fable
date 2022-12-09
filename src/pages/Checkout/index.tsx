import BreadCrumb from '../../components/BreadCrumb';
import Cart from '../../components/Cart';
import { useAppSelector } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import CheckoutForm from './CheckoutForm';
import CheckoutSummary from './CheckoutSummary';
import './style.scss';

const Checkout = () => {
  const cartItems = useAppSelector(selectItems);

  return (
    <section className="checkout">
      <div className="container">
        <BreadCrumb
          links={[
            { title: 'Collections', url: '/#fable-of-colors-section' },
            { title: 'Order', url: '#' },
          ]}
        />

        <div className="checkout__grid">
          <CheckoutForm />

          {cartItems.length ? (
            <div>
              <Cart />
              <CheckoutSummary />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Checkout;
