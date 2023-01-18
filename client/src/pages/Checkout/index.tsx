import { BreadCrumb, Cart, Container } from '../../components';
import { useAppSelector, useSetTitle } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import CheckoutForm from './CheckoutForm';
import CheckoutSummary from './CheckoutSummary';

const Checkout = () => {
  const cartItems = useAppSelector(selectItems);

  useSetTitle('Checkout');

  return (
    <section className="mb-11">
      <Container>
        <BreadCrumb
          links={[
            { title: 'Collections', url: '/collections' },
            { title: 'Order', url: '#' },
          ]}
        />

        <div className="grid lg:grid-cols-2 mt-11 gap-16">
          <CheckoutForm className="order-2 lg:order-1" />

          {cartItems.length ? (
            <div className="order-1 lg:order-2">
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
