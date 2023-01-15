import { AxiosError, AxiosResponse } from 'axios';

import Order from '../types/order';
import * as api from '../api';
import { useMutation } from 'react-query';

const useCreateOrder = (onSuccess?: () => void, onError?: () => void) =>
  useMutation<AxiosResponse<Order>, AxiosError, Order>(api.createOrder, {
    onSuccess,
    onError,
  });

export default useCreateOrder;
