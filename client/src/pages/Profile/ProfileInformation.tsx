import { useForm } from 'react-hook-form';
import { Button, FormError, Input, Label } from '../../components';
import {
  useCreateBuyer,
  useGetBuyer,
  useSetTitle,
  useUpdateBuyer,
} from '../../hooks';
import { Buyer } from '../../types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

interface ProfileInput extends Omit<Buyer, '_id' | 'orders'> {}

const schema = yup.object({
  name: yup.string().required('Your full name is required'),
  phone: yup
    .number()
    .typeError('You must type a valid phone number')
    .required(),
  email: yup
    .string()
    .email('You must type a valid email address')
    .required('Your email address is required'),
  city: yup.string().required('Your city is required'),
  address: yup.string().required('Your address is required'),
});

const ProfileInformation = () => {
  useSetTitle('Account Details');

  const [processing, setProcessing] = useState(false);

  const { data: buyer } = useGetBuyer({
    id: localStorage.getItem('buyerId') || '',
  });

  const { mutateAsync: updateBuyer } = useUpdateBuyer();

  const { mutateAsync: createBuyer } = useCreateBuyer();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formValues: ProfileInput) => {
    setProcessing(true);

    if (!localStorage.getItem('buyerId')) {
      const { data } = await createBuyer(formValues);
      localStorage.setItem('buyerId', data._id as string);
    } else {
      await updateBuyer({
        id: localStorage.getItem('buyerId') as string,
        newBuyer: formValues,
      });
    }

    setProcessing(false);
  };

  useEffect(() => {
    if (buyer) {
      reset({
        name: buyer.name,
        phone: buyer.phone,
        email: buyer.email,
        city: buyer.city,
        address: buyer.address,
      });
    }
  }, [buyer]);

  return (
    <>
      <h2>Your account details</h2>
      <hr className="border-gray2 my-6" />

      <form onSubmit={handleSubmit(onSubmit)} className="md:w-10/12">
        <div className="mb-5">
          <Label>Name and surname</Label>
          <Input
            type="text"
            placeholder="Enter name and surname"
            {...register('name')}
          />
          {errors.name?.message && <FormError message={errors.name?.message} />}
        </div>

        <div className="mb-5 flex flex-col md:flex-row gap-y-5 md:gap-y-0 gap-x-10">
          <div className="w-full">
            <Label>Phone</Label>
            <Input
              type="number"
              placeholder="Enter phone number"
              {...register('phone')}
            />
            {errors.phone?.message && (
              <FormError message={errors.phone?.message} />
            )}
          </div>

          <div className="w-full">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter email"
              {...register('email')}
            />
            {errors.email?.message && (
              <FormError message={errors.email?.message} />
            )}
          </div>
        </div>
        <div className="mb-9 flex flex-col md:flex-row gap-y-5 md:gap-y-0 gap-x-10">
          <div className="w-full">
            <Label>City</Label>
            <Input type="text" placeholder="Enter city" {...register('city')} />
            {errors.city?.message && (
              <FormError message={errors.city?.message} />
            )}
          </div>

          <div className="w-full">
            <Label>Address</Label>
            <Input type="text" placeholder="Address" {...register('address')} />
            {errors.address?.message && (
              <FormError message={errors.address?.message} />
            )}
          </div>
        </div>

        <Button disabled={processing}>
          {processing ? 'Please wait' : 'Save'}
        </Button>
      </form>
    </>
  );
};

export default ProfileInformation;
