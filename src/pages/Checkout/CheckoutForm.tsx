import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, useController } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import { Button, Checkbox, FormError, Input, Label } from '../../components';
import {
  useAppDispatch,
  useAppSelector,
  useCreateBuyer,
  useGetBuyer,
} from '../../hooks';
import { replaceItems, selectItems } from '../../store/slices/cart';
import { Buyer, CheckoutInput } from '../../types';
import { DeliveryMethods, PaymentMethods } from '../../enums';
import { deliveryMethods, initialOrderData, paymentMethods } from './data';
import * as api from '../../api';
import { useCreateOrder } from '../../hooks';
import axios from '../../axios';
import { apiRoutes } from '../../routes';

const schema = yup.object({
  city: yup.string().required('Your city is required'),
  deliveryMethod: yup.string().oneOf(Object.values(DeliveryMethods)),
  address: yup.string().required('Your address is required'),
  loyaltyCard: yup
    .number()
    .typeError('You must type a valid loyalty card')
    .positive()
    .integer()
    .required(),
  name: yup.string().required('Your full name is required'),
  phone: yup
    .number()
    .typeError('You must type a valid phone number')
    .required(),
  email: yup
    .string()
    .email('You must type a valid email address')
    .required('Your email address is required'),
  paymentMethod: yup.string().oneOf(Object.values(PaymentMethods)),
  orderComment: yup.string(),
  agree: yup.bool(),
});

const CheckoutForm = ({ className }: { className: string }) => {
  const [processing, setProcessing] = useState(false);
  const cartItems = useAppSelector(selectItems);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { data: currentBuyer } = useGetBuyer(
    localStorage.getItem('buyerId') || ''
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<CheckoutInput>({
    defaultValues: initialOrderData,
    resolver: yupResolver(schema),
  });

  const watchDeliveryMethod = watch('deliveryMethod');
  const watchPaymentMethod = watch('paymentMethod');
  const watchAgree = watch('agree');

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

  const { mutateAsync: createBuyer } = useCreateBuyer();
  const { mutateAsync: createOrder } = useCreateOrder();

  const handleDeliveryMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as DeliveryMethods;
    deliveryMethodField.onChange(value);
  };

  const handlePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as PaymentMethods;
    paymentMethodField.onChange(value);
  };

  const handleAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    agreeField.onChange(e.target.checked);
  };

  const onSubmit = async (formValues: CheckoutInput) => {
    if (!cartItems.length) return;

    setProcessing(true);

    const { name, phone, email, city, address, deliveryMethod, paymentMethod } =
      formValues;

    let buyer: Buyer;

    if (!localStorage.getItem('buyerId')) {
      const { data } = await createBuyer({
        name,
        phone,
        email,
        city,
        address,
      });

      buyer = data;

      localStorage.setItem('buyerId', buyer._id || '');
    } else {
      const { data } = await api.getBuyer(
        localStorage.getItem('buyerId') || ''
      );

      buyer = data;
    }

    if (paymentMethod === PaymentMethods.Card) {
      try {
        const { data } = await axios.post(apiRoutes.checkout, {
          buyerId: buyer._id,
          deliveryMethod,
          paymentMethod,
          cartItems,
        });

        localStorage.setItem('formValues', JSON.stringify(formValues));
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        window.location = data.url;
      } catch (err: unknown) {
        const e = err as AxiosError;
        console.log(e.message);
        setProcessing(false);
      }
    } else if (paymentMethod === PaymentMethods.Cod) {
      try {
        // create orders attach buyer id on each
        const orderIds: string[] = [];

        for (const item of cartItems) {
          const { data } = await createOrder({
            product: item.product,
            color: item.color,
            size: item.size,
            quantity: item.quantity,
            buyer: buyer._id as string,
            deliveryMethod,
            paymentMethod,
            status: 'pending',
          });

          orderIds.push(data._id as string);
        }

        // update buyer's order property with orderIds
        await api.updateBuyer(buyer._id as string, {
          ...buyer,
          orders: orderIds,
        });

        dispatch(replaceItems([]));

        navigate('/profile', { replace: true });
      } catch (err: unknown) {
        const e = err as AxiosError;
        console.log(e.message);
        setProcessing(false);
      }
    }
  };

  useEffect(() => {
    // prefills data loaded from localstorage
    if (currentBuyer) {
      const { name, phone, email, city, address } = currentBuyer;

      const formValues = JSON.parse(localStorage.getItem('formValues') || '{}');

      if (Object.keys(formValues).length) {
        reset({ ...formValues, name, phone, email, city, address });
        localStorage.removeItem('formValues');
      } else {
        reset({ ...initialOrderData, name, phone, email, city, address });
      }

      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

      if (Object.keys(cartItems).length) {
        dispatch(replaceItems(cartItems));
        localStorage.removeItem('cartItems');
      }
    }
  }, [currentBuyer]);

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
            disabled={!!currentBuyer}
          />
          {errors.city?.message && <FormError message={errors.city?.message} />}
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
                      watchDeliveryMethod === deliveryMethod.method
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
          <Input
            type="text"
            placeholder="Address"
            {...register('address')}
            disabled={!!currentBuyer}
          />
          {errors.address?.message && (
            <FormError message={errors.address?.message} />
          )}
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
        {errors.loyaltyCard?.message && (
          <FormError message={errors.loyaltyCard?.message} />
        )}
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
            disabled={!!currentBuyer}
          />
          {errors.name?.message && <FormError message={errors.name?.message} />}
        </div>

        <div className="mb-5">
          <Label className="text-base font-normal mb-2">Phone</Label>
          <Input
            type="number"
            placeholder="Enter phone number"
            {...register('phone')}
            disabled={!!currentBuyer}
          />
          {errors.phone?.message && (
            <FormError message={errors.phone?.message} />
          )}
        </div>

        <div>
          <Label className="text-base font-normal mb-2">Email</Label>
          <Input
            type="email"
            placeholder="Enter email"
            {...register('email')}
            disabled={!!currentBuyer}
          />
          {errors.email?.message && (
            <FormError message={errors.email?.message} />
          )}
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
                  watchPaymentMethod === paymentMethod.method
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
        {errors.orderComment?.message && (
          <FormError message={errors.orderComment?.message} />
        )}
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

      <Button
        className="w-full"
        disabled={
          !watchAgree ||
          !cartItems.length ||
          !!Object.keys(errors).length ||
          processing
        }
      >
        {processing ? 'Please wait' : 'Place an order'}
      </Button>

      {!cartItems.length && (
        <FormError
          message="Please add items to your cart first."
          className="text-center w-full"
        />
      )}
    </form>
  );
};

export default CheckoutForm;
