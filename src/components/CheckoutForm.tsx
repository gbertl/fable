import React, { useState } from 'react';

enum DeliveryMethods {
  PickUp = 'pick-up',
  ToDoor = 'to-door',
}

enum PaymentMethods {
  Card = 'card',
  Cod = 'cod',
}

interface Data {
  deliveryMethod: DeliveryMethods;
  paymentMethod: PaymentMethods;
  agree: boolean;
}

const initialData = {
  deliveryMethod: DeliveryMethods.PickUp,
  paymentMethod: PaymentMethods.Card,
  agree: false,
};

const CheckoutForm = () => {
  const [data, setData] = useState<Data>(initialData);

  const handleDeliveryMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as DeliveryMethods;
    setData((prevData) => ({ ...prevData, deliveryMethod: value }));
  };

  const handlePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as PaymentMethods;
    setData((prevData) => ({
      ...prevData,
      paymentMethod: value,
    }));
  };

  return (
    <form className="checkout__form">
      <div className="checkout__form-group">
        {/* City */}
        <div>
          <label htmlFor="" className="form__label">
            City
          </label>
          <input
            type="text"
            placeholder="Enter city"
            className="form__input w-1/2"
          />
        </div>

        {/* Delivery method */}
        <div>
          <label htmlFor="" className="form__label">
            Delivery method
          </label>

          <div className="checkout__form-delivery-btns">
            <div className="inline-block">
              <input
                type="radio"
                name="delivery-method"
                id="pickup"
                className="hidden checkout__form-delivery-input"
                onChange={handleDeliveryMethod}
                value={DeliveryMethods.PickUp}
                checked={data.deliveryMethod === DeliveryMethods.PickUp}
              />
              <label
                htmlFor="pickup"
                className="btn btn-outline w-full checkout__form-delivery-btn"
              >
                In-store pick up
              </label>
            </div>

            <div className="inline-block">
              <input
                type="radio"
                name="delivery-method"
                id="to-door"
                className="hidden checkout__form-delivery-input"
                onChange={handleDeliveryMethod}
                value={DeliveryMethods.ToDoor}
                checked={data.deliveryMethod === DeliveryMethods.ToDoor}
              />
              <label
                htmlFor="to-door"
                className="btn btn-outline w-full checkout__form-delivery-btn"
              >
                To the door
              </label>
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="" className="form__label">
            Address
          </label>
          <input type="text" placeholder="Address" className="form__input" />
        </div>
      </div>

      {/* Point */}
      <div className="checkout__form-group">
        <h5 className="checkout__form-title">Point</h5>

        <label htmlFor="" className="form__label">
          Enter your loyalty card
        </label>
        <input
          type="text"
          placeholder="Enter loyalty card"
          className="form__input w-1/2"
        />
      </div>

      {/* Recipient's details */}
      <div className="checkout__form-group">
        <h5 className="checkout__form-title">Recipient's details</h5>

        <div>
          <label htmlFor="" className="form__label">
            Name and surname
          </label>
          <input
            type="text"
            placeholder="Enter name and surname"
            className="form__input"
          />
        </div>

        <div>
          <label htmlFor="" className="form__label">
            Phone
          </label>
          <input
            type="phone"
            placeholder="Enter phone number"
            className="form__input"
          />
        </div>

        <div>
          <label htmlFor="" className="form__label">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter emails"
            className="form__input"
          />
        </div>
      </div>

      {/* Payment method */}
      <div className="checkout__form-group">
        <h5 className="checkout__form-title">Payment method</h5>

        <div className="checkout__form-payment-card">
          <input
            type="radio"
            name="payment-method"
            className="hidden checkout__form-payment-input"
            id="card"
            value={PaymentMethods.Card}
            onChange={handlePaymentMethod}
            checked={data.paymentMethod === PaymentMethods.Card}
          />
          <label
            htmlFor="card"
            className="btn btn-outline w-full checkout__form-payment-btn"
          >
            Payment card
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="payment-method"
            className="hidden checkout__form-payment-input"
            id="cod"
            value={PaymentMethods.Cod}
            onChange={handlePaymentMethod}
            checked={data.paymentMethod === PaymentMethods.Cod}
          />
          <label
            htmlFor="cod"
            className="btn btn-outline w-full checkout__form-payment-btn"
          >
            Cash on delivery
          </label>
        </div>
      </div>

      {/* Order comment */}
      <div className="checkout__form-group">
        <label htmlFor="" className="form__label">
          Order Comment
        </label>
        <textarea
          name=""
          id=""
          className="form__input form__textarea"
        ></textarea>
      </div>

      {/* Terms */}
      <div className="checkout__form-agree form__checkbox">
        <input
          type="checkbox"
          name="terms"
          id="terms"
          className="hidden form__checkbox-input"
          onChange={(e) => {
            setData((prevData) => ({ ...prevData, agree: e.target.checked }));
          }}
        />
        <label htmlFor="terms" className="form__label">
          <span className="form__checkbox-icon"></span>I agree to the terms of
          the offer and the loyalty policy
        </label>
      </div>

      <button className="btn btn-primary w-full" disabled={!data.agree}>
        Place an order
      </button>
    </form>
  );
};

export default CheckoutForm;
