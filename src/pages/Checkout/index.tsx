import { BreadCrumb, Cart, Container } from '../../components';
import { useAppSelector } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import CheckoutForm from './CheckoutForm';
import CheckoutSummary from './CheckoutSummary';

const Checkout = () => {
  const cartItems = useAppSelector(selectItems);

  return (
    <section>
      <Container>
        <BreadCrumb
          links={[
            { title: 'Collections', url: '/#fable-of-klassik-section' },
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
