import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import * as api from '../api';
import { Buyer } from '../types';

const useCreateBuyer = (onSuccess?: () => void, onError?: () => void) => {
  return useMutation<AxiosResponse<Buyer>, AxiosError, Buyer>(api.createBuyer, {
    onSuccess,
    onError,
  });
};

export default useCreateBuyer;
