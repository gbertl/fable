import React, { useState } from 'react';
import { Button } from '../../components';

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
    <form>
      <div className="mb-14">
        {/* City */}
        <div className="mb-9">
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
        <div className="mb-9">
          <label htmlFor="" className="form__label">
            Delivery method
          </label>

          <div className="grid grid-cols-2 gap-5">
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
              <Button
                as="label"
                variant="outline"
                htmlFor="pickup"
                className="w-full checkout__form-delivery-btn py-3"
              >
                In-store pick up
              </Button>
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
              <Button
                as="label"
                htmlFor="to-door"
                className="w-full checkout__form-delivery-btn py-3"
              >
                To the door
              </Button>
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="" className="form__label">
            Address
          </label>
          <input
            type="text"
            placeholder="Address"
            className="form__input w-full"
          />
        </div>
      </div>

      {/* Point */}
      <div className="mb-14">
        <h5 className="text-xl mb-5">Point</h5>

        <label htmlFor="" className="form__label text-base font-normal">
          Enter your loyalty card
        </label>
        <input
          type="text"
          placeholder="Enter loyalty card"
          className="form__input w-1/2"
        />
      </div>

      {/* Recipient's details */}
      <div className="mb-14">
        <h5 className="text-xl mb-5">Recipient's details</h5>

        <div className="mb-5">
          <label htmlFor="" className="form__label text-base font-normal mb-2">
            Name and surname
          </label>
          <input
            type="text"
            placeholder="Enter name and surname"
            className="form__input w-full"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="" className="form__label text-base font-normal mb-2">
            Phone
          </label>
          <input
            type="phone"
            placeholder="Enter phone number"
            className="form__input w-full"
          />
        </div>

        <div>
          <label htmlFor="" className="form__label text-base font-normal mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter emails"
            className="form__input w-full"
          />
        </div>
      </div>

      {/* Payment method */}
      <div className="mb-14">
        <h5 className="text-xl mb-5">Payment method</h5>

        <div className="mb-5">
          <input
            type="radio"
            name="payment-method"
            className="hidden checkout__form-payment-input"
            id="card"
            value={PaymentMethods.Card}
            onChange={handlePaymentMethod}
            checked={data.paymentMethod === PaymentMethods.Card}
          />
          <Button
            as="label"
            variant="outline"
            htmlFor="card"
            className="w-full checkout__form-payment-btn"
          >
            Payment card
          </Button>
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
          <Button
            as="label"
            variant="outline"
            htmlFor="cod"
            className="w-full checkout__form-payment-btn"
          >
            Cash on delivery
          </Button>
        </div>
      </div>

      {/* Order comment */}
      <div className="mb-14">
        <label htmlFor="" className="form__label">
          Order Comment
        </label>
        <textarea
          name=""
          id=""
          className="form__input form__textarea w-full"
        ></textarea>
      </div>

      {/* Terms */}
      <div className="mb-8 form__checkbox">
        <input
          type="checkbox"
          name="terms"
          id="terms"
          className="hidden form__checkbox-input"
          onChange={(e) => {
            setData((prevData) => ({ ...prevData, agree: e.target.checked }));
          }}
        />
        <label
          htmlFor="terms"
          className="form__label mb-0 text-base font-normal select-none"
        >
          <span className="form__checkbox-icon"></span>I agree to the terms of
          the offer and the loyalty policy
        </label>
      </div>

      <Button className="w-full" disabled={!data.agree}>
        Place an order
      </Button>
    </form>
  );
};

export default CheckoutForm;
