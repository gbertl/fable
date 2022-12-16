import { BreadCrumb, Cart, Container } from '../../components';
import { useAppSelector } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import CheckoutForm from './CheckoutForm';
import CheckoutSummary from './CheckoutSummary';

const Checkout = () => {
  const cartItems = useAppSelector(selectItems);

  return (
    <section className="mb-11">
      <Container>
        <BreadCrumb
          links={[
            { title: 'Collections', url: '/collections' },
            { title: 'Order', url: '#' },
          ]}
        />

        <div className="grid grid-cols-2 mt-11 gap-16">
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
