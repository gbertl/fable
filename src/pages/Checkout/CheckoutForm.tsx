import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useForm, useController } from 'react-hook-form';

import { Button, Checkbox, Input, Label } from '../../components';
import { useAppSelector } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import axios from '../../axios';
import { DeliveryMethods, PaymentMethods, Order } from '../../typings';
import {
  deliveryMethods,
  initialData,
  initialOrderData,
  paymentMethods,
} from './data';

interface Data {
  deliveryMethod: DeliveryMethods;
  paymentMethod: PaymentMethods;
  agree: boolean;
}

const CheckoutForm = ({ className }: { className: string }) => {
  const [data, setData] = useState<Data>(initialData);
  const cartItems = useAppSelector(selectItems);

  const { register, handleSubmit, control } = useForm({
    defaultValues: initialOrderData,
  });

  const { field: deliveryMethodField } = useController({
    name: 'deliveryMethod',
    control,
  });

  const { field: paymentMethodField } = useController({
    name: 'paymentMethod',
    control,
  });

  const { field: agreeField } = useController({
    name: 'agree',
    control,
  });

  const handleDeliveryMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as DeliveryMethods;
    setData((prevData) => ({ ...prevData, deliveryMethod: value }));
    deliveryMethodField.onChange(value);
  };

  const handlePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as PaymentMethods;
    setData((prevData) => ({
      ...prevData,
      paymentMethod: value,
    }));
    paymentMethodField.onChange(value);
  };

  const handleAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({ ...prevData, agree: e.target.checked }));
    agreeField.onChange(e.target.checked);
  };

  const onSubmit = async (formValues: Order) => {
    if (!cartItems.length) return;

    try {
      const { data } = await axios.post('/checkout', cartItems);
      window.location = data.url;
    } catch (err: unknown) {
      const e = err as AxiosError;
      console.log(e.message);
    }

    console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${className}`}>
      <div className="mb-14">
        {/* City */}
        <div className="mb-9">
          <Label>City</Label>
          <Input
            type="text"
            placeholder="Enter city"
            className="md:w-1/2"
            {...register('city')}
          />
        </div>

        {/* Delivery method */}
        <div className="mb-9">
          <Label>Delivery method</Label>

          <div className="grid md:grid-cols-2 gap-5">
            {deliveryMethods.map((deliveryMethod, idx) => {
              return (
                <div key={idx}>
                  <input
                    type="radio"
                    name={deliveryMethodField.name}
                    className="hidden"
                    value={deliveryMethod.method}
                    id={deliveryMethod.method}
                    onChange={handleDeliveryMethod}
                  />
                  <Button
                    as="label"
                    variant="outline"
                    htmlFor={deliveryMethod.method}
                    className={`w-full lg:px-0 ${
                      data.deliveryMethod === deliveryMethod.method
                        ? 'bg-dark text-white cursor-auto'
                        : ''
                    }`}
                  >
                    {deliveryMethod.title}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Address */}
        <div>
          <Label>Address</Label>
          <Input type="text" placeholder="Address" {...register('address')} />
        </div>
      </div>

      {/* Point */}
      <div className="mb-14">
        <h5 className="text-xl mb-5">Point</h5>

        <Label className="text-base font-normal">Enter your loyalty card</Label>
        <Input
          type="number"
          placeholder="Enter loyalty card"
          className="md:w-1/2"
          {...register('loyaltyCard')}
        />
      </div>

      {/* Recipient's details */}
      <div className="mb-14">
        <h5 className="text-xl mb-5">Recipient's details</h5>

        <div className="mb-5">
          <Label className="text-base font-normal mb-2">Name and surname</Label>
          <Input
            type="text"
            placeholder="Enter name and surname"
            {...register('name')}
          />
        </div>

        <div className="mb-5">
          <Label className="text-base font-normal mb-2">Phone</Label>
          <Input
            type="number"
            placeholder="Enter phone number"
            {...register('phone')}
          />
        </div>

        <div>
          <Label className="text-base font-normal mb-2">Email</Label>
          <Input
            type="email"
            placeholder="Enter emails"
            {...register('email')}
          />
        </div>
      </div>

      {/* Payment method */}
      <div className="mb-14">
        <h5 className="text-xl mb-5">Payment method</h5>

        {paymentMethods.map((paymentMethod, idx) => {
          return (
            <React.Fragment key={idx}>
              <input
                type="radio"
                name={paymentMethodField.name}
                className="hidden"
                id={paymentMethod.method}
                value={paymentMethod.method}
                onChange={handlePaymentMethod}
              />
              <Button
                as="label"
                variant="outline"
                htmlFor={paymentMethod.method}
                className={`w-full ${
                  data.paymentMethod === paymentMethod.method
                    ? 'bg-dark text-white cursor-auto'
                    : ''
                } ${idx !== 0 ? 'mt-5' : ''}`}
              >
                {paymentMethod.title}
              </Button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Order comment */}
      <div className="mb-14">
        <Label>Order Comment</Label>
        <Input as="textarea" {...register('orderComment')} />
      </div>

      {/* Terms */}
      <div className="mb-8">
        <Checkbox
          label="I agree to the terms of the offer and the loyalty policy"
          className="mb-0 text-base font-normal select-none"
          name={agreeField.name}
          controlId="terms"
          defaultChecked={agreeField.value}
          onChange={handleAgree}
        />
      </div>

      <Button className="w-full" disabled={!data.agree || !cartItems.length}>
        Place an order
      </Button>

      {!cartItems.length && (
        <span className="text-xs text-red-500 text-center w-full block mt-2">
          Please add items to your cart first.
        </span>
      )}
    </form>
  );
};

export default CheckoutForm;
