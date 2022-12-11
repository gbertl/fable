import { BreadCrumb, Cart, Container } from '../../components';
import { useAppSelector } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import CheckoutForm from './CheckoutForm';
import CheckoutSummary from './CheckoutSummary';
import './style.scss';

const Checkout = () => {
  const cartItems = useAppSelector(selectItems);

  return (
    <section className="checkout">
      <Container>
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
      </Container>
    </section>
  );
};

export default Checkout;
