import BreadCrumb from '../../components/BreadCrumb';
import CheckoutForm from '../../components/CheckoutForm';
import './style.scss';

const Checkout = () => {
  return (
    <div className="checkout">
      <div className="container">
        <BreadCrumb
          links={[
            { title: 'Shopping Bag', url: '#' },
            { title: 'Order', url: '#' },
          ]}
        />

        <div className="checkout__grid">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
